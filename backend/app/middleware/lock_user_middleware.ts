import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LockUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.isLocked) {
      return ctx.response.forbidden('Your account is locked, you cannot perform this action.')
    }
    const output = await next()
    return output
  }
}
