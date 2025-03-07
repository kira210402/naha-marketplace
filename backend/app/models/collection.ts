import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare status: boolean

  @column()
  declare deleted: boolean

  @column({ columnName: 'store_id' })
  declare storeId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Product)
  declare products: ManyToMany<typeof Product>
}
