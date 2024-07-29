import OrderItem from '#models/order_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrderItemsController {
  public async index({ response }: HttpContext) {
    const orderItems = await OrderItem.query().preload('product').preload('order')
    return response.ok({
      code: 200,
      message: 'List of order items fetched successfully',
      orderItems,
    })
  }

  public async show({ params, response }: HttpContext) {
    const orderItem = await OrderItem.query()
      .where('id', params.id)
      .preload('product')
      .preload('order')
      .first()

    if (!orderItem) {
      return response.status(404).json({ message: 'OrderItem not found' })
    }

    return response.ok({
      code: 200,
      message: 'Order item fetched successfully',
      orderItem,
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['orderId', 'productId', 'quantity', 'status', 'price'])

    const orderItem = await OrderItem.create(data)
    await orderItem.load('product')
    await orderItem.load('order')

    return response.created({
      code: 201,
      message: 'Order item created successfully',
      orderItem,
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const orderItem = await OrderItem.find(params.id)
    if (!orderItem) {
      return response.status(404).json({ message: 'OrderItem not found' })
    }

    const data = request.only(['orderId', 'productId', 'quantity', 'status', 'price'])
    orderItem.merge(data)
    await orderItem.save()

    await orderItem.load('product')
    await orderItem.load('order')

    return response.ok({
      code: 200,
      message: 'Order item updated successfully',
      orderItem,
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const orderItem = await OrderItem.find(params.id)
    if (!orderItem) {
      return response.status(404).json({ message: 'OrderItem not found' })
    }

    await orderItem.delete()
    return response.status(204).json({ message: 'Order item deleted successfully' })
  }
}
