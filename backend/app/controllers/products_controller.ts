import ProductException from '#exceptions/product_exception'
import StoreException from '#exceptions/store_exception'
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
    const store = await Store.findOrFail(params.storeId)
    const products = await Product.query().where('storeId', params.storeId)
    return response.ok({
      code: 200,
      message: 'get products by store success',
      store: store.name,
      products,
    })
  }

  async store({ request, auth, response, params }: HttpContext) {
    // const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    const stores = await Store.query().where('userId', auth.user?.$attributes.id)
    console.log('stores ', stores)
    // find store that has id equal to params.storeId
    const store = stores.find((store) => store.$attributes.id === parseInt(params.storeId))
    // const store = stores[0]
    console.log('store ', store)
    if (!store) throw new StoreException()
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
