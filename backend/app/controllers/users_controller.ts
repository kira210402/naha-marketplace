import ClientException from '#exceptions/client_exception'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { UploadCloudinary } from '#services/upload_cloudinary_service'
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
    const file = request.file('avatar')
    const { username, email, password } = request.only(['username', 'email', 'password'])
    let cloudinary_response = await UploadCloudinary.upload(file)
    const { url } = cloudinary_response as { url: string }
    const data = {
      username,
      email,
      password,
      avatar: url,
    }
    const payload = await createUserValidator.validate(data)
    const user = await User.create(payload)
    return response.ok({
      code: 200,
      message: 'success',
      user,
    })
  }

  async update({ request, response, auth }: HttpContext) {
    try {
      const { username, email, password, phoneNumber, address } = request.only([
        'username',
        'email',
        'password',
        'phoneNumber',
        'address',
      ])
      const user = await User.findOrFail(auth.user?.$attributes.id)
      let avatar: string = user.avatar
      if (request.file('avatar')) {
        const file = request.file('avatar')
        let cloudinary_response = await UploadCloudinary.upload(file)
        const { url } = cloudinary_response as { url: string }
        avatar = url
      }
      console.log('avatar', avatar)
      const data = {
        username,
        email,
        password,
        avatar,
        phoneNumber,
        address,
      }
      const payload = await updateUserValidator.validate(data)
      await user.merge(payload).save()

      return response.ok({
        code: 200,
        message: 'success',
        user,
      })
    } catch (error) {
      console.log('error', error)
    }
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
  async lockUser({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) throw new ClientException()
    user.isLocked = true
    await user.save()
    return response.ok({
      code: 200,
      message: `lock user ${user.username} success`,
    })
  }
}
