import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'
import { EOrderPayment } from '../enums/EOrderPayment.js'
import { EOrderStatus } from '../enums/EOrderStatus.js'
import Store from '#models/store'
import StoreException from '#exceptions/store_exception'
import CartItem from '#models/cart_item'

export default class OrdersController {
  async indexByStore({ response, auth, pagination, params }: HttpContext) {
    const { page, perPage } = pagination
    const stores = await Store.query().where('userId', auth.user?.$attributes.id)
    const store = stores.find((store) => store.id === params.id)
    if (!store) throw new StoreException()

    const orders = await Order.query()
      .select('orders.*')
      .join('cart_items', 'orders.cart_item_id', 'cart_items.id')
      .join('products', 'cart_items.product_id', 'products.id')
      .where('products.store_id', store.id)
      .paginate(page, perPage)

    return response.ok({
      code: 200,
      message: `List orders of store ${store.name} success`,
      orders,
    })
  }

  async indexByUser({ response, auth, pagination }: HttpContext) {
    const { page, perPage } = pagination
    const orders = await Order.query()
      .where('userId', auth.user?.$attributes.id)
      .paginate(page, perPage)
    return response.ok({
      code: 200,
      message: `List orders of user ${auth.user?.$attributes.username} success`,
      orders,
    })
  }

  async updateMyOrder({ response, request, params, auth }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    if (order.userId !== auth.user?.$attributes.id) {
      throw new Error('You are not allowed to update this order')
    }
    const data = request.only(['status'])
    if (data.status === EOrderStatus.Processing) {
      throw new Error('You are not allowed to update status to Processing')
    }
    order.merge(data)
    await order.save()
    return response.ok({
      code: 200,
      message: 'Update order success',
      order,
    })
  }

  async updateStoreOrder({ request, response, auth }: HttpContext) {
    const { id, storeId } = request.params()
    const store = await Store.findOrFail(storeId)
    if (store.userId !== auth.user?.$attributes.id) {
      throw new Error('You are not allowed to update this order')
    }
    const order = await Order.findOrFail(id)
    const data = request.only(['status'])
    if (data.status !== EOrderStatus.Delivered) {
      throw new Error('You are not allowed to update status to Delivered')
    }
    order.merge(data)
    await order.save()
    return response.ok({
      code: 200,
      message: 'Update order success',
      order,
    })
  }

  async store({ response, request, auth }: HttpContext) {
    const {
      cartItemIds,
      receiverName,
      phoneNumber,
      address,
      payment,
    }: {
      cartItemIds: number[]
      receiverName: string
      phoneNumber: string
      address: string
      payment: EOrderPayment
    } = request.only(['cartItemIds', 'receiverName', 'phoneNumber', 'address', 'payment'])
    if (cartItemIds.length == 0) {
      return response.badRequest({
        code: 403,
        message: 'There is no products',
      })
    }
    const order = await Order.create({
      userId: auth.user?.$attributes.id,
      status: EOrderStatus.Pending,
      receiverName,
      phoneNumber,
      address,
      payment,
    })

    const cartItems = await CartItem.query().whereIn('id', cartItemIds).preload('product')

    await Promise.all(
      cartItems.map(async (cartItem) => {
        const totalPrice =
          (cartItem.quantity * cartItem.product.price * (100 - cartItem.product.discount)) / 100
        return CartItem.query().where('id', cartItem.id).update({
          orderId: order.id,
          totalPrice,
        })
      })
    )

    console.log('cartItems', cartItems)

    await Order.query()
      .where('id', order.id)
      .preload('cartItems', (query) => {
        query.preload('product')
      })

    return response.created({
      code: 201,
      message: 'Create orders success',
      order,
    })
  }

  async getListOrderByUserId({ response, auth }: HttpContext) {
    try {
      const userId = auth.user?.$attributes.id

      if (!userId) {
        return response.unauthorized({
          code: 401,
          message: 'Unauthorized',
        })
      }

      const orders = await Order.query()
        .where('userId', userId)
        .preload('cartItems', (item) => {
          item.preload('product')
        })

      return response.ok({
        code: 200,
        message: 'List orders of user success',
        orders,
      })
    } catch (error) {
      console.error('Error fetching orders:', error)
      return response.internalServerError({
        code: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
