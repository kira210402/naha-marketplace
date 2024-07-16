import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PaginationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const pagination = {
      perPage: ctx.request.input('per_page', 5),
      page: ctx.request.input('page', 1),
    }
    ctx.pagination = pagination
    const output = await next()
    return output
  }
}
