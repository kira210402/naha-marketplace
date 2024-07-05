import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  async index({ response, auth, pagination }: HttpContext) {
    const { page, perPage } = pagination
    const orders = await Order.query()
      .where('userId', auth.user?.$attributes.id)
      .paginate(page, perPage)
    return response.ok({
      code: 200,
      message: 'List orders success',
      orders,
    })
  }

  async addCartItem({}: HttpContext) {}
}
