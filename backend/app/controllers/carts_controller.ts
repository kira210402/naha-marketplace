// import type { HttpContext } from '@adonisjs/core/http'
// import Cart from '#models/cart'
// import CartItem from '#models/cart_item'
// import { addProductToCartValidator } from '#validators/cart'
// import Product from '#models/product'

// export default class CartsController {
//   async index({ request, response, params }: HttpContext) {
//     // const { page, perPage } = pagination
//     // const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
//     const cart = await Cart.findOrFail(params.id)
//     // const sortField = request.input('sortField', 'id')
//     // const sortOrder = request.input('sortOrder', 'asc')
//     const cartItems = await CartItem.query().where('cartId', cart.id)
//     // .orderBy(sortField, sortOrder)
//     // .paginate(page, perPage)
//     const products = []
//     for (let cartItem of cartItems) {
//       const product = await Product.find(cartItem.productId)
//       products.push(product?.$attributes)
//     }
//     console.log('products', products)
//     return response.ok({
//       code: 200,
//       message: 'get cart items success',
//       products,
//     })
//   }

//   async addProduct({ request, response, auth }: HttpContext) {
//     const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
//     const data = request.only(['productId', 'quantity'])
//     const payload = await addProductToCartValidator.validate(data)
//     const product = await Product.findOrFail(data.productId)
//     if (product.quantity < data.quantity) {
//       throw new Error('quantity exceeds stock')
//     }
//     const cartItem = await CartItem.create({
//       cartId: cart.id,
//       ...payload,
//     })
//     return response.created({
//       code: 201,
//       message: 'add product to cart success',
//       cartItem,
//     })
//   }

//   async update({ request, response, auth }: HttpContext) {
//     const cart = await Cart.findByOrFail('userId', auth.user?.$attributes.id)
//     const data: { id: number; quantity: number }[] = request.body() as {
//       id: number
//       quantity: number
//     }[]
//     for (const item of data) {
//       const cartItem = await CartItem.find(item.id)
//       if (!cartItem) continue
//       if (cartItem.cartId == cart.id) {
//         await cartItem.merge({ quantity: item.quantity }).save()
//       }
//     }
//     const cartItems = await CartItem.query().where('cartId', cart.id)
//     return response.ok({
//       code: 200,
//       message: 'update cart success',
//       cartItems,
//     })
//   }
// }

import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import { addProductToCartValidator } from '#validators/cart'
import Product from '#models/product'

export default class CartsController {
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

  async addProduct({ request, response, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const cart = await Cart.findByOrFail('user_id', user.id)

      const data = request.only(['productId', 'quantity'])
      const payload = await addProductToCartValidator.validate(data)

      const product = await Product.findOrFail(payload.productId)

      if (product.quantity < payload.quantity) {
        return response.badRequest({
          code: 400,
          message: 'Quantity exceeds stock',
        })
      }

      const cartItem = await CartItem.create({
        cartId: cart.id,
        ...payload,
      })

      return response.created({
        code: 201,
        message: 'Add product to cart success',
        cartItem,
      })
    } catch (error) {
      return response.badRequest({
        code: 400,
        message: 'Failed to add product to cart',
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
