import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
