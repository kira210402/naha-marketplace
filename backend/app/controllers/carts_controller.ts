import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import Product from '#models/product'

export default class CartsController {

  async addProduct({ response, auth, params }: HttpContext) {
    const { productId } = params
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const product = await Product.findOrFail(productId)
    let cartItem = await CartItem.query()
      .where('cartId', cart.id)
      .where('productId', product.id)
      .first()
    if (cartItem) {
      await cartItem.merge({ quantity: cartItem.quantity + 1 }).save()
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity: 1,
      })
    }
    return response.created({
      code: 201,
      message: 'add product to cart success',
      product: product.$attributes,
      cartItem: cartItem?.$attributes,
    })
  }
  async index({ response, params }: HttpContext) {
    try {
      const cart = await Cart.findOrFail(params.id)
      const cartItems = await CartItem.query().where('cart_id', cart.id).preload('product')

      const products = cartItems.map((cartItem) => cartItem.product)

      return response.ok({
        code: 200,
        message: 'Get cart items success',
        products,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          code: 404,
          message: 'Cart not found',
        })
      }

      return response.internalServerError({
        code: 500,
        message: 'Failed to get cart items',
        error: error.message,
      })
    }
  }

  async update({ request, response, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const cart = await Cart.findByOrFail('user_id', user.id)
      const data = request.input('cartItems') as { id: number; quantity: number }[]

      for (const item of data) {
        const cartItem = await CartItem.find(item.id)
        if (!cartItem || cartItem.cartId !== cart.id) continue
        cartItem.quantity = item.quantity
        await cartItem.save()
      }

      const updatedCartItems = await CartItem.query().where('cart_id', cart.id)
      return response.ok({
        code: 200,
        message: 'Update cart success',
        cartItems: updatedCartItems,
      })
    } catch (error) {
      return response.badRequest({
        code: 400,
        message: 'Failed to update cart',
        error: error.message,
      })
    }
  }
}
