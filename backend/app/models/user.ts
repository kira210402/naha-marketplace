import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Store from './store.js'
import { JwtAccessTokenProvider, JwtSecret } from '#providers/jwt_access_token_provider'
import parseDuration from 'parse-duration'
import env from '#start/env'
import { EUserRole } from '../enums/EUserRole.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: EUserRole

  @column()
  declare avatar: string

  @column()
  declare phone: string | null

  @column()
  declare address: string | null

  @column({ columnName: 'is_locked' })
  declare isLocked: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Store, {
    foreignKey: 'userId',
  })
  declare user: HasMany<typeof Store>

  static accessTokens = JwtAccessTokenProvider.forModel(User, {
    expiresInMillis: parseDuration('1 day')!,
    key: new JwtSecret(env.get('JWT_ACCESS_TOKEN_KEY')),
    primaryKey: 'id',
    algorithm: 'HS256',
    audience: 'https://client.example.com',
    issuer: 'https://server.example.com',
  })
}
