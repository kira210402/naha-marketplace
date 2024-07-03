import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.only(['username', 'email', 'password'])
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    return response.created({
      message: 'Register success',
      user,
    })
  }

  async login({ request, response }: HttpContext) {
    const data = await request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.ok({
      message: 'Login success',
      accessToken: token,
    })
  }

  async logout({ response, auth }: HttpContext) {
    const getUser = auth.user?.id
    const user = await User.findOrFail(getUser)
    await User.accessTokens.delete(user, user.id)

    return response.ok({
      success: true,
      message: 'User logged out',
    })
  }
}
