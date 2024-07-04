import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/http-server'

export default class ProductException extends Exception {
  static status = 404
  static code = 'Product not found'
  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status).send(error.code)
  }
}
