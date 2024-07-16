import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Collection from './collection.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'store_id' })
  declare storeId: number

  @column()
  declare cartItemId: number

  @column({ columnName: 'category_id' })
  declare categoryId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare discount: number

  @column()
  declare images: string[]

  @column()
  declare status: boolean

  @column()
  declare deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Collection)
  declare collections: ManyToMany<typeof Collection>
}
