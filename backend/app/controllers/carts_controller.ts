import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import Product from '#models/product'

export default class CartsController {
  async index({ response, auth }: HttpContext) {
    try {
      const userId = await auth.user?.id
      const cart = await Cart.findByOrFail('userId', userId)
      const cartItems = await cart.related('cartItems').query()
      const products = []
      for (let cartItem of cartItems) {
        const product = await cartItem.related('product').query().first()
        products.push({
          product: product?.$attributes,
          quantity: cartItem.quantity,
          id: cartItem.id,
        })
      }
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

  async addProduct({ request, response, auth, params }: HttpContext) {
    const { productId } = params
    const quantity = Math.max(1, parseInt(request.qs().quantity || '1', 10))
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const product = await Product.findOrFail(productId)

    let cartItem
    cartItem = await CartItem.query()
      .where('cartId', cart.id)
      .where('productId', product.id)
      .first()

    if (cartItem) {
      await cartItem.merge({ quantity: cartItem.quantity + 1 }).save()
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity,
      })
    }

    return response.created({
      code: 201,
      message: 'add product to cart success',
      product: product.$attributes,
      cartItem: cartItem?.$attributes,
    })
  }

  async update({ request, response, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const cart = await Cart.findByOrFail('userId', user?.id)
      const data = request.body()
      for (const item in data) {
        const dataCartItem = data[item]
        const cartItem = await CartItem.find(dataCartItem.id)
        if (!cartItem || cartItem.cartId !== cart.id) continue
        await cartItem.merge(dataCartItem).save()
      }
      return response.ok({
        code: 200,
        message: 'Update cart success',
      })
    } catch (error) {
      return response.badRequest({
        code: 400,
        message: 'Failed to update cart',
        error: error.message,
      })
    }
  }

  async destroy({ response, auth, params }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const cart = await Cart.findByOrFail('userId', user?.id)
      const cartItemId = params.cartItemId
      const cartItem = await CartItem.findOrFail(cartItemId)
      if (cartItem.cartId !== cart.id) {
        return response.status(403).json({
          message: 'Bạn không có quyền xóa item này khỏi giỏ hàng.',
        })
      }
      await cartItem.delete()
      return response.ok({
        code: 200,
        message: 'Delete successfully',
      })
    } catch (error) {
      return response.abort({
        code: 400,
        message: 'Delete failed',
      })
    }
  }
}
