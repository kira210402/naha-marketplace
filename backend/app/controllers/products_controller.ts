import ProductException from '#exceptions/product_exception'
import StoreException from '#exceptions/store_exception'
import Product from '#models/product'
import Store from '#models/store'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import { EUserRole } from '../enums/EUserRole.js'
import { UploadCloudinary } from '#services/upload_cloudinary_service'

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
    const stores = await Store.query().where('userId', auth.user?.$attributes.id)
    const store = stores.find((store) => store.$attributes.id === parseInt(params.storeId))
    if (!store) throw new StoreException()
    if (store.userId !== auth.user?.$attributes.id)
      throw new Error('You are not authorized to perform this action')

    const files = request.files('images') as any[]
    let cloudResponse = await UploadCloudinary.uploadFiles(files)
    const imagesUrl = (cloudResponse.files as { url: string }[]).map((file) => file.url)

    const { name, description, price, quantity, discount } = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'discount',
    ])

    const data = {
      name,
      description,
      price,
      quantity,
      discount,
      images: JSON.stringify(imagesUrl),
    }

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

  async update({ params, request, response, auth }: HttpContext) {
    const stores = await Store.query().where('userId', auth.user?.$attributes.id)
    const product = await Product.findOrFail(params.id)
    const store = stores.find((store) => store.$attributes.id === product.storeId)
    if (!store) throw new Error('You are not authorized to perform this action')

    const files = request.files('images') as any[]
    let cloudResponse = await UploadCloudinary.uploadFiles(files)
    const imagesUrl = (cloudResponse.files as { url: string }[]).map((file) => file.url)

    const { name, description, price, quantity, discount } = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'discount',
    ])
    const data = {
      name,
      description,
      price,
      quantity,
      discount,
      images: JSON.stringify(imagesUrl),
    }

    const payload = await updateProductValidator.validate(data)

    await product.merge(payload).save()
    console.log(product)
    return response.ok({
      code: 200,
      message: 'update product success',
      product,
    })
  }

  async destroy({ params, response, auth }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const store = await Store.findOrFail(product.storeId)
    if (
      store.userId !== auth.user?.$attributes.id &&
      auth.user?.$attributes.role !== EUserRole.ADMIN
    ) {
      throw new Error('You are not authorized to perform this action')
    }
    await product.delete()
    return response.ok({
      code: 200,
      message: 'delete product success',
    })
  }
}
