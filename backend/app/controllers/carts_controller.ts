import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import { addProductToCartValidator } from '#validators/cart'
import Product from '#models/product'

export default class CartsController {
  async index({ request, response, pagination, auth }: HttpContext) {
    const { page, perPage } = pagination
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    console.log('cart ', cart)
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    const cartItems = await CartItem.query()
      .where('cartId', cart.id)
      .orderBy(sortField, sortOrder)
      .paginate(page, perPage)
    return response.ok({
      code: 200,
      message: 'get cart items success',
      cartItems,
    })
  }

  async addProduct({ request, response, auth }: HttpContext) {
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const data = request.only(['productId', 'quantity'])
    const payload = await addProductToCartValidator.validate(data)
    const product = await Product.findOrFail(data.productId)
    if (product.quantity < data.quantity) {
      throw new Error('quantity exceeds stock')
    }
    const cartItem = await CartItem.create({
      cartId: cart.id,
      ...payload,
    })
    return response.created({
      code: 201,
      message: 'add product to cart success',
      cartItem,
    })
  }

  async update({ request, response, auth }: HttpContext) {
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const data: { id: number; quantity: number; }[] = request.body() as { id: number; quantity: number; }[];
    for (const item of data) {
      const cartItem = await CartItem.findOrFail(item.id)
      if(cartItem.cartId == cart.id) {
        await cartItem.merge({ quantity: item.quantity }).save()
      }
    }
    const cartItems = await CartItem.query().where('cartId', cart.id)
    return response.ok({
      code: 200,
      message: 'update cart success',
      cartItems,
    })
  }
}
