import ProductException from '#exceptions/product_exception'
import StoreException from '#exceptions/store_exception'
import Product from '#models/product'
import Store from '#models/store'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import { EUserRole } from '../enums/EUserRole.js'
import { UploadCloudinary } from '#services/upload_cloudinary_service'
import { messages } from '@vinejs/vine/defaults'

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

  async store({ request, auth, response }: HttpContext) {
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
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
      status: true,
    }

    const payload = await createProductValidator.validate(data)
    const product = await Product.create({
      storeId: store.id,
      ...payload,
    })

    return response.created({
      code: 200,
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
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    if (!store) throw new StoreException()
    if (store.userId !== auth.user?.$attributes.id)
      throw new Error('You are not authorized to perform this action')
    const product = await Product.findOrFail(params.id)

    const files = request.files('images') as any[]
    let cloudResponse = await UploadCloudinary.uploadFiles(files)
    const imagesUrl = (cloudResponse.files as { url: string }[]).map((file) => file.url)

    const { name, description, price, quantity, discount, status } = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'discount',
      'status',
    ])
    const data = {
      name,
      description,
      price,
      quantity,
      discount,
      images: JSON.stringify(imagesUrl),
      status,
    }

    const payload = await updateProductValidator.validate(data)

    await product.merge(payload).save()
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
    product.deleted = true
    await product.save()
    return response.ok({
      code: 200,
      message: 'delete product success',
    })
  }

  async search({ request, response }: HttpContext) {
    const { query } = request.qs()
    try {
      const products = await Product.query()
        .where('name', 'ilike', `%${query}%`)
        .orWhereRaw('CAST(price AS TEXT) ilike ?', [`%${query}%`])
        .paginate(1, 10)

      return response.ok({
        code: 200,
        message: 'search product success',
        products,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async changeStatus({ request, response, auth, params }: HttpContext) {
    const listStatus = ['active', 'inactive']
    const status = request.input('status')
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    if (!store) throw new StoreException()
    if (store.userId !== auth.user?.$attributes.id)
      throw new Error('You are not authorized to perform this action')
    const product = await Product.findOrFail(params.id)
    if (listStatus.includes(status)) {
      product.status = status
      await product.save()
      return response.ok({
        code: 200,
        messages: 'Success',
        data: product,
      })
    } else {
      return response.abort({
        code: 400,
        messages: 'Failed',
      })
    }
  }
}
