import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import { addProductToCartValidator } from '#validators/cart'
import Product from '#models/product'

export default class CartsController {
  async index({ request, response, params, auth }: HttpContext) {
    // const { page, perPage } = pagination
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    // const cart = await Cart.findOrFail(params.id)
    // const sortField = request.input('sortField', 'id')
    // const sortOrder = request.input('sortOrder', 'asc')
    const cartItems = await CartItem.query().where('cartId', cart.id)
    // .orderBy(sortField, sortOrder)
    // .paginate(page, perPage)
    const result = []
    for (let cartItem of cartItems) {
      const product = await Product.find(cartItem.productId)
      result.push({ product: product?.$attributes, cartItem: cartItem.$attributes })
    }

    return response.ok({
      code: 200,
      message: 'get cart items success',
      result,
    })
  }

  async addProduct({ response, auth, params }: HttpContext) {
    const { productId } = params
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const product = await Product.findOrFail(productId)
    // await CartItem.create({
    //   cartId: cart.id,
    //   productId: product.id,
    //   quantity: 1,
    // })
    // check if product already in cart, increase quantity, else add new item
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

  async update({ request, response, auth }: HttpContext) {
    const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const data: { id: number; quantity: number }[] = request.body() as {
      id: number
      quantity: number
    }[]
    for (const item of data) {
      const cartItem = await CartItem.find(item.id)
      if (!cartItem) continue
      if (cartItem.cartId == cart.id) {
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
