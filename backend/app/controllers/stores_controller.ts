import StoreException from '#exceptions/store_exception'
import Product from '#models/product'
import Store from '#models/store'
import { UploadCloudinary } from '#services/upload_cloudinary_service'
import { createStoreValidator, updateStoreValidator } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoresController {
  async index({ request, response, pagination }: HttpContext) {
    const { page, perPage } = pagination
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    const stores = await Store.query().orderBy(sortField, sortOrder).paginate(page, perPage)
    if (!stores) throw new StoreException()
    return response.ok({
      code: 200,
      message: 'get stores success',
      stores,
    })
  }

  async indexByUser({ auth, response }: HttpContext) {
    const store = await Store.query().where('userId', auth.user?.$attributes.id).first()
    return response.ok({
      code: 200,
      message: 'get stores by user success',
      store,
    })
  }

  async store({ request, auth, response }: HttpContext) {
    const file = request.file('avatar')
    let cloudinary_response = await UploadCloudinary.upload(file)
    const { url } = cloudinary_response as { url: string }

    const { name, description, phoneNumber, address } = request.only([
      'name',
      'description',
      'phoneNumber',
      'address',
    ])
    const data = {
      name,
      description,
      phoneNumber,
      address,
      avatar: url,
    }
    const payload = await createStoreValidator.validate(data)
    const store = await Store.create({
      userId: auth.user?.$attributes.id,
      ...payload,
    })
    return response.created({
      code: 201,
      message: 'create store success',
      store,
    })
  }

  async show({ params, response }: HttpContext) {
    const store = await Store.query().where('id', params.id).preload('products').firstOrFail()
    return response.ok({
      code: 200,
      message: 'get store success',
      store,
    })
  }

  async update({ request, response, auth }: HttpContext) {
    const { name, description, phoneNumber, address } = request.only(['name', 'description', 'phoneNumber', 'address'])
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    let avatar: string = store.avatar
    if (request.file('avatar')) {
      const file = request.file('avatar')
      let cloudinary_response = await UploadCloudinary.upload(file)
      const { url } = cloudinary_response as { url: string }
      avatar = url
    }
    const data = {
      name,
      description,
      phoneNumber,
      address,
      avatar
    }
    const payload = await updateStoreValidator.validate(data)

    await store.merge(payload).save()
    return response.ok({
      code: 200,
      message: 'update store success',
      store,
    })
  }

  async verify({ params, response }: HttpContext) {
    const store = await Store.findOrFail(params.id)
    store.status = true
    await store.save()
    return response.ok({
      code: 200,
      message: 'verify store success',
      store,
    })
  }

  async destroy({ params, response, auth }: HttpContext) {
    const store = await Store.findOrFail(params.id)
    if (store.userId !== auth.user?.$attributes.id) {
      throw new Error('You are not authorized to perform this action')
    }
    await store.delete()
    return response.ok({
      code: 200,
      message: 'delete store success',
    })
  }

  async getListProductByStore({ request, pagination, response, auth }: HttpContext) {
    const { page, perPage } = pagination
    const filter = request.input('status', ' all')
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    const productsQuery = Product.query().where('deleted', false).where('storeId', store.id)
    switch (filter) {
      case 'active':
        productsQuery.where('status', true)
        break
      case 'inactive':
        productsQuery.where('status', false)
        break
      default:
        break
    }

    productsQuery.orderBy(sortField, sortOrder)

    const products = await productsQuery.paginate(page, perPage)
    const allProducts = await Product.query().where('deleted', false).where('storeId', store.id)

    return response.ok({
      code: 200,
      message: 'Get products by store success',
      products,
      allProducts,
    })
  }
}
