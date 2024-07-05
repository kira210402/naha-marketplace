import Cart from '#models/cart'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.only(['username', 'email', 'password'])
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
    const data = await request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.ok({
      code: 200,
      message: 'Login success',
      accessToken: token,
    })
  }

  async logout({ response, auth }: HttpContext) {
    // delete accessToken of user that has logined
    

    return response.ok({
      code: 200,
      message: 'logout success',
    })
  }
}
