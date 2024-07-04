import ProductException from '#exceptions/product_exception'
import Product from '#models/product'
import Store from '#models/store'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ request, response, pagination }: HttpContext) {
    const { page, perPage } = pagination
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    const products = await Product.query().orderBy(sortField, sortOrder).paginate(page, perPage)
    if (!products) throw new ProductException()
    return response.ok({
      code: 200,
      message: 'get products success',
      products,
    })
  }

  async indexByStore({ response, params }: HttpContext) {
    const products = await Product.query().where('storeId', params.storeId)
    return response.ok({
      code: 200,
      message: 'get products by store success',
      products,
    })
  }

  async store({ request, auth, response }: HttpContext) {
    console.log('ok', auth.user?.$attributes.id)
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    // const store = await Store.query().where('userId', auth.user?.$attributes.id)
    const data = request.only(['name', 'description', 'price', 'quantity', 'discount'])
    const payload = await createProductValidator.validate(data)
    const product = await Product.create({
      storeId: store.id,
      ...payload,
    })
    return response.created({
      code: 201,
      message: 'create product success',
      product,
    })
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return response.ok({
      code: 200,
      message: 'get store success',
      product,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price', 'quantity', 'discount'])
    const payload = await updateProductValidator.validate(data)
    const product = await Product.findOrFail(params.id)
    await product.merge(payload).save()
    return response.ok({
      code: 200,
      message: 'update product success',
      product,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.ok({
      code: 200,
      message: 'delete product success',
    })
  }
}
