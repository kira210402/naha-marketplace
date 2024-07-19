import Cart from '#models/cart'
import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password', 'fullName'])

    const existingEmail = await User.findBy('email', data.email)
    if (existingEmail) {
      return response.status(400).send({
        code: 400,
        message: 'Email already exists',
      })
    }

    const existingUsername = await User.findBy('username', data.username)
    if (existingUsername) {
      return response.status(400).send({
        code: 400,
        message: 'Username already exists',
      })
    }
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    await Cart.create({ userId: user.id })
    return response.created({
      code: 201,
      message: 'Register success',
      user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.ok({
      code: 200,
      message: 'Login success',
      accessToken: token,
    })
  }
}
