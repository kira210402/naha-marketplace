import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import { addProductToCartValidator } from '#validators/cart'
import Product from '#models/product'

export default class CartsController {
  async index({ request, response, params }: HttpContext) {
    // const { page, perPage } = pagination
    // const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
    const cart = await Cart.findOrFail(params.id)
    // const sortField = request.input('sortField', 'id')
    // const sortOrder = request.input('sortOrder', 'asc')
    const cartItems = await CartItem.query()
      .where('cartId', cart.id)
      // .orderBy(sortField, sortOrder)
      // .paginate(page, perPage)
    const products = []
    for(let cartItem of cartItems) {
      const product = await Product.find(cartItem.productId)
      products.push(product?.$attributes)
    }
    console.log('products', products)
    return response.ok({
      code: 200,
      message: 'get cart items success',
      products,
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
