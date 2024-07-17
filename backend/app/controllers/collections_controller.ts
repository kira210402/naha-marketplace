import Collection from '#models/collection'
import Product from '#models/product'
import Store from '#models/store'
import { createCollectionValidator, updateCollectionValidator } from '#validators/collection'
import type { HttpContext } from '@adonisjs/core/http'
export default class CollectionsController {
  async index({ response, auth }: HttpContext) {
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    const collections = await Collection.query()
      .where('storeId', store.id)
      .where('deleted', false)
      .preload('products')
    const result = collections.map((collection) => {
      return {
        ...collection.toJSON(),
        productCount: collection.products.length,
      }
    })
    return response.ok({
      code: 200,
      message: 'get collections success',
      result,
    })
  }

  async store({ request, response, auth }: HttpContext) {
    const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
    const data = request.only(['name', 'description'])
    const payload = await createCollectionValidator.validate(data)
    const existedCollection = await Collection.findByOrFail('name', payload.name)
    if (existedCollection) {
      return response.badRequest({
        code: 400,
        message: 'Collection name already exists',
      })
    }
    const collection = await Collection.create({
      ...payload,
      storeId: store.id,
    })
    return response.created({
      code: 201,
      message: 'create collection success',
      collection,
    })
  }

  async show({ params }: HttpContext) {
    const collection = await Collection.query()
      .where('id', params.id)
      .where('deleted', false)
      .firstOrFail()
    await collection.load('products')
    return {
      code: 200,
      message: 'get collection success',
      collection,
    }
  }

  async update({ request, params }: HttpContext) {
    const data = request.only(['name', 'description'])
    const payload = await updateCollectionValidator.validate(data)
    // variable existedCollection to check if the collection name already exists, and the name is not the same as the current collection
    const existedCollection = await Collection.query()
      .where('id', '!=', params.id)
      .where('name', payload.name)
      .first()

    if(existedCollection) {
      return {
        code: 400,
        message: 'Collection name already exists',
      }
    }
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
    collection.deleted = true
    await collection.save()
    return {
      code: 200,
      message: 'delete collection success',
    }
  }

  async addProduct({ request, params, response, auth }: HttpContext) {
    try {
      const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
      const productIds = request.input('productIds')
      const collection = await Collection.findOrFail(params.id)

      const products = await Product.query()
        .where('storeId', store?.id)
        .where('deleted', false)
        .whereIn('id', productIds)

      const productIdsOfStore = products.map((product) => product.id)

      await collection.related('products').attach(productIdsOfStore)

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

  // function to delete a product in products of collection
  async removeProduct({ params, response, auth }: HttpContext) {
    try {
      const { id, productId } = params
      const store = await Store.findByOrFail('userId', auth.user?.$attributes.id)
      const collection = await Collection.findOrFail(id)

      await Product.query()
        .where('storeId', store?.id)
        .where('deleted', false)
        .where('id', productId)
        .firstOrFail()

      await collection.related('products').detach([productId])
      const result = await Collection.query().where('id', collection.id).preload('products').first()

      return response.ok({
        code: 200,
        message: 'Products removed from collection successfully',
        result,
      })
    } catch (error) {
      return response.internalServerError({
        code: 500,
        message: 'An error occurred while removing products from the collection',
        error: error.message,
      })
    }
  }
}
