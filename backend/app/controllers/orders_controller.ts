import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'
import { EOrderPayment } from '../enums/EOrderPayment.js'
import { EOrderStatus } from '../enums/EOrderStatus.js'
import Store from '#models/store'
import CartItem from '#models/cart_item'
import { DateTime } from 'luxon'
export default class OrdersController {
  async indexByStore({ response, auth, request }: HttpContext) {
    const filter = request.input('status', ' all')
    const startDate = request.input('start_date')
    console.log('startDate', startDate)
    const endDate = request.input('end_date')
    console.log('endDate', endDate)
    const userId = auth.user?.$attributes.id
    if (!userId) {
      return response.unauthorized({
        code: 401,
        message: 'Unauthorized',
      })
    }

    const store = await Store.query().where('userId', userId).firstOrFail()
    if (!store) {
      return response.notFound({
        code: 404,
        message: 'Store not found',
      })
    }

    let orderItemsQuery = CartItem.query()
      .where('storeId', store.id)
      .whereNotNull('orderId')
      .preload('order')
      .preload('product')

    if (startDate) {
      const parsedStartDate = DateTime.fromISO(startDate).toSQLDate()
      console.log('parsedStartDate', parsedStartDate)
      if (parsedStartDate) {
        orderItemsQuery.where('createdAt', '>=', parsedStartDate)
      }
    }

    if (endDate) {
      const parsedEndDate = DateTime.fromISO(endDate).toSQLDate()
      if (parsedEndDate) {
        orderItemsQuery.where('createdAt', '<=', parsedEndDate)
      }
    }

    switch (filter) {
      case 'Pending':
        orderItemsQuery.where('status', 'Pending')
        break
      case 'Processing':
        orderItemsQuery.where('status', 'Processing')
        break
      case 'Delivering':
        orderItemsQuery.where('status', 'Delivering')
        break
      case 'Delivered':
        orderItemsQuery.where('status', 'Delivered')
        break
      case 'Cancelled':
        orderItemsQuery.where('status', 'Cancelled')
        break
      default:
        break
    }
    const orderItems = await orderItemsQuery
    console.log('orderItems', orderItems)
    return response.ok({
      code: 200,
      message: `List orders of store ${store.name} success`,
      orderItems,
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

  async updateMyOrder({ response, request, params }: HttpContext) {
    const cartItem = await CartItem.findOrFail(params.cartItemId)
    let { status } = request.only(['status'])

    cartItem.status = status
    await cartItem.save()
    return response.ok({
      code: 200,
      message: 'Update cartItem success',
      cartItem,
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
      totalPrice,
    }: {
      cartItemIds: number[]
      receiverName: string
      phoneNumber: string
      address: string
      payment: EOrderPayment
      totalPrice: number
    } = request.only([
      'cartItemIds',
      'receiverName',
      'phoneNumber',
      'address',
      'payment',
      'totalPrice',
    ])
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
      totalPrice,
    })

    await CartItem.query().whereIn('id', cartItemIds).update({
      orderId: order.id,
      status: EOrderStatus.Pending,
    })

    await order.load('cartItems', (query) => {
      query.preload('product')
    })

    console.log('order', order)

    return response.created({
      code: 201,
      message: 'Create order success',
      order,
    })
  }

  async getListOrderByUserId({ response, auth }: HttpContext) {
    const userId = auth.user?.id

    if (!userId) {
      return response.unauthorized({
        code: 401,
        message: 'Unauthorized',
      })
    }

    const orders = await Order.query()
      .where('user_id', userId)
      .preload('cartItems', (query) => {
        query.preload('product')
      })

    for (const order of orders) {
      for (const cartItem of order.cartItems) {
        const store = await Store.find(cartItem.storeId);
        if (store) {
          cartItem.storeName = store.name; // Add store name to cartItem
        }
      }
    }

    if (orders.length === 0) {
      return response.notFound({
        code: 404,
        message: 'No orders found for this user',
      })
    }

    console.log('orders', orders)

    return response.ok({
      code: 200,
      message: 'List orders of user success',
      orders,
    })
  }

  async cancelOrderItemFromStore({ response, params }: HttpContext) {
    try {
      const cartItem = await CartItem.findOrFail(params.id)
      await cartItem.delete()
      return response.ok({
        code: 200,
        message: 'Cart item deleted successfully',
      })
    } catch (error) {
      return response.internalServerError({
        code: 500,
        message: 'Error deleting cart item',
        error: error.message,
      })
    }
  }
}
