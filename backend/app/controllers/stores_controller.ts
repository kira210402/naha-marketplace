import StoreException from '#exceptions/store_exception'
import Store from '#models/store'
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
    const stores = await Store.query().where('userId', auth.user?.$attributes.id)
    return response.ok({
      code: 200,
      message: 'get stores by user success',
      stores,
    })
  }

  async store({ request, auth, response }: HttpContext) {
    const data = request.only(['name', 'description', 'phoneNumber', 'address'])
    const payload = await createStoreValidator.validate(data)
    console.log('auth.user ', auth.user?.$attributes.id)
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
    const store = await Store.findOrFail(params.id)
    return response.ok({
      code: 200,
      message: 'get store success',
      store,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'phoneNumber', 'address', 'avatar'])
    const payload = await updateStoreValidator.validate(data)
    const store = await Store.findOrFail(params.id)
    await store.merge(payload).save()
    return response.ok({
      code: 200,
      message: 'update store success',
      store,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const store = await Store.findOrFail(params.id)
    await store.delete()
    return response.ok({
      code: 200,
      message: 'delete store success',
    })
  }
}
