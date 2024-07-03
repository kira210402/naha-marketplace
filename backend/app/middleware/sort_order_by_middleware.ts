import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
export default class SortMiddleware {
  public async handle({ request }: HttpContext, next: NextFn) {
    const sortField = request.input('sortField', 'id')
    const sortOrder = request.input('sortOrder', 'asc')
    request.updateBody({
      sortField,
      sortOrder: sortOrder.toLowerCase() === 'desc' ? 'desc' : 'asc',
    })
    await next()
  }
}
