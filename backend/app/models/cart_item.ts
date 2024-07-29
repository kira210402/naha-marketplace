import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import { EOrderStatus } from '../enums/EOrderStatus.js'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cartId: number

  @column()
  declare orderId: number

  @column()
  declare storeId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column({ columnName: 'total_price' })
  declare totalPrice: number

  @column()
  declare status: EOrderStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Product, {
    localKey: 'productId',
    foreignKey: 'id',
  })
  declare product: HasOne<typeof Product>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
