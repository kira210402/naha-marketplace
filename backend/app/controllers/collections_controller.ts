import Collection from '#models/collection'
import Product from '#models/product'
import { createCollectionValidator, updateCollectionValidator } from '#validators/collection'
import type { HttpContext } from '@adonisjs/core/http'
export default class CollectionsController {
  async index({ response }: HttpContext) {
    const collections = await Collection.query().preload('products')
    return response.ok({
      code: 200,
      message: 'get collections success',
      collections,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'storeId'])
    const payload = await createCollectionValidator.validate(data)
    const collection = await Collection.create(payload)
    return response.created({
      code: 201,
      message: 'create collection success',
      collection,
    })
  }

  async show({ params }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    await collection.load('products')
    return {
      code: 200,
      message: 'get collection success',
      collection,
    }
  }

  async update({ request, params }: HttpContext) {
    const data = request.only(['name', 'description', 'storeId'])
    const payload = await updateCollectionValidator.validate(data)
    const collection = await Collection.findOrFail(params.id)
    collection.merge(payload)
    await collection.save()
    return {
      code: 200,
      message: 'update collection success',
      collection,
    }
  }

  async destroy({ params }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    await collection.delete()
    return {
      code: 200,
      message: 'delete collection success',
    }
  }

  async addProduct({ request, params, response }: HttpContext) {
    try {
      const productIds = request.input('productIds')
      const collection = await Collection.findOrFail(params.id)

      const products = await Product.query().whereIn('id', productIds)
      if (products.length !== productIds.length) {
        return response.badRequest({
          code: 400,
          message: 'One or more products do not exist',
        })
      }

      await collection.related('products').attach(productIds)

      const result = await Collection.query().where('id', collection.id).preload('products').first()

      return response.ok({
        code: 200,
        message: 'Products added to collection successfully',
        result,
      })
    } catch (error) {
      return response.internalServerError({
        code: 500,
        message: 'An error occurred while adding products to the collection',
        error: error.message,
      })
    }
  }
}
