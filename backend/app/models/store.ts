import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Collection from './collection.js'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column({ columnName: 'phone' })
  declare phoneNumber: string

  @column()
  declare address: string

  @column()
  declare avatar: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Product)
  declare product: HasMany<typeof Product>

  @hasMany(() => Collection)
  declare collection: HasMany<typeof Collection>
}
