import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { EUserRole } from '../enums/EUserRole.js'

export default class RolePolicy extends BasePolicy {
  async handle(user: User, role: EUserRole) {
    return user.role === role
  }
}
