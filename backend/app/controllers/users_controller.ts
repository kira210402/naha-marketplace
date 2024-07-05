import cloudinary from '#config/cloudinary'
import ClientException from '#exceptions/client_exception'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { pipeline } from 'node:stream/promises'
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
    const data = request.only(['username', 'password', 'email'])
    const user = await User.create(data)
    return response.ok({
      code: 200,
      message: 'success',
      user,
    })
  }

  async update({ request, params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (request.file('avatar')) {
      let cloudinary_response = await UploadCloudinary.upload(request.file('avatar'))
      console.log(cloudinary_response)
      return response.json(cloudinary_response)
    }
    if (!user) {
      throw new ClientException()
    }
    user.username = request.input('username')
    user.password = request.input('password')
    await user.save()
    return response.ok({
      code: 200,
      message: 'success',
      user,
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

  async upload({ request, response }: HttpContext) {
    try {
      if (request.file('avatar')) {
        let cloudinary_response = await UploadCloudinary.upload(request.file('avatar'))
        const { url } = cloudinary_response as { url: string }
        return response.json(cloudinary_response)
      }
      return response.json({ status: false, data: 'Please upload an Image.' })
    } catch (error) {
      return response.status(500).json({ status: false, error: error.message })
    }
  }
}
