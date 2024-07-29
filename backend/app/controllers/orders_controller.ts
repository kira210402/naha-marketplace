import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'
import { EOrderPayment } from '../enums/EOrderPayment.js'
import { EOrderStatus } from '../enums/EOrderStatus.js'
import Store from '#models/store'
import CartItem from '#models/cart_item'
import OrderItem from '#models/order_item'
export default class OrdersController {
  async indexByStore({ response, auth }: HttpContext) {
    const store = await Store.query().where('userId', auth.user?.$attributes.id).firstOrFail()

    const orders = await CartItem.query().where('storeId', store.id).whereNotNull('orderId')

    return response.ok({
      code: 200,
      message: `List orders of store ${store.name} success`,
      orders,
    })
  }

  async indexByUser({ response, auth, request }: HttpContext) {
    const { page = 1, perPage = 10 } = request.qs()
    const orders = await Order.query()
      .where('userId', auth.user?.$attributes.id)
      .preload('orderItems', (query) => {
        query.preload('product')
      })
      .paginate(page, perPage)

    return response.ok({
      code: 200,
      message: `List orders of user ${auth.user?.username} success`,
      orders,
    })
  }

  async updateMyOrder({ response, request, params, auth }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    if (order.userId !== auth.user?.id) {
      return response.unauthorized({
        code: 403,
        message: 'You are not allowed to update this order',
      })
    }
    const { status } = request.only(['status'])
    if (status === EOrderStatus.Processing) {
      return response.badRequest({
        code: 400,
        message: 'You are not allowed to update status to Processing',
      })
    }
    const orderItems = await OrderItem.query().where('orderId', order.id)

    await Promise.all(
      orderItems.map(async (orderItem) => {
        orderItem.status = status
        await orderItem.save()
      })
    )
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
    if (store.userId !== auth.user?.id) {
      return response.unauthorized({
        code: 403,
        message: 'You are not allowed to update this order',
      })
    }
    const order = await Order.findOrFail(id)
    const data = request.only(['status'])
    if (data.status !== EOrderStatus.Delivered) {
      return response.badRequest({
        code: 400,
        message: 'You are not allowed to update status to Delivered',
      })
    }
    await order.load('orderItems')
    return response.ok({
      code: 200,
      message: 'Update order items status success',
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
      totalPrice
    }: {
      cartItemIds: number[]
      receiverName: string
      phoneNumber: string
      address: string
      payment: EOrderPayment
      totalPrice: number
    } = request.only(['cartItemIds', 'receiverName', 'phoneNumber', 'address', 'payment', 'totalPrice'])
    if (cartItemIds.length === 0) {
      return response.badRequest({
        code: 403,
        message: 'There are no products',
      })
    }

    if (await CartItem.query().where('id', cartItemIds[0]).whereNotNull('orderId').first()) {
      return response.badRequest({
        code: 403,
        message: 'Products have been ordered',
      })
    }

    const order = await Order.create({
      userId: auth.user?.id,
      receiverName,
      phoneNumber,
      address,
      payment,
      totalPrice
    })

    await CartItem.query().whereIn('id', cartItemIds).update({
      orderId: order.id,
      status: EOrderStatus.Pending,
    })

    await order.load('cartItems', (query) => {
      query.preload('product')
    })

    return response.created({
      code: 201,
      message: 'Create order success',
      order,
    })
  }

  async getListOrderByUserId({ response, auth }: HttpContext) {
    try {
      const userId = auth.user?.id

      if (!userId) {
        return response.unauthorized({
          code: 401,
          message: 'Unauthorized',
        })
      }

      const orders = await Order.query()
        .where('userId', userId)
        .preload('orderItems', (item) => {
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
