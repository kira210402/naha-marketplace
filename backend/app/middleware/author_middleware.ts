import RolePolicy from '#policies/role_policy'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { EUserRole } from '../enums/EUserRole.js'

export default class AuthorMiddleware {
  async handle({ bouncer, response }: HttpContext, next: NextFn, role: EUserRole) {
    if (await bouncer.with(RolePolicy).denies('handle', role)) {
      return response.forbidden('You are not authorized to perform this action')
    }
    await next()
  }
}
