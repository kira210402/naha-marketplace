import ClientException from '#exceptions/client_exception'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  async index({ request, response, pagination }: HttpContext) {
    const { perPage, page } = pagination
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    const users = await User.query().orderBy(sortField, sortOrder).paginate(page, perPage)
    if (!users) throw new ClientException()
    return response.ok({
      code: 200,
      message: 'success',
      users,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['username', 'password', 'email'])
    const payload = await createUserValidator.validate(data)
    const user = await User.create(payload)
    return response.ok({
      code: 200,
      message: 'success',
      user,
    })
  }

  async update({ request, params, response }: HttpContext) {
    const data = request.only(['username', 'password', 'email'])
    const payload = await updateUserValidator.validate(data)
    const user = await User.findOrFail(params.id)
    const updatedUser = await user.merge(payload).save()
    return response.ok({
      code: 200,
      message: 'success',
      user: updatedUser,
    })
  }

  async destroy({ response, params }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      throw new ClientException()
    }
    await user?.delete()
    return response.ok({
      code: 200,
      message: 'success',
    })
  }

  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) throw new ClientException()
    response.status(200).json({ code: 200, message: 'success', user })
  }
}
