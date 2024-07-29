import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CartItem from './cart_item.js'
import { EOrderPayment } from '../enums/EOrderPayment.js'
import OrderItem from './order_item.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'receiver_names' })
  declare receiverName: string

  @column({ columnName: 'total_price' })
  declare totalPrice: number

  @column()
  declare payment: EOrderPayment

  @column({ columnName: 'phone_number' })
  declare phoneNumber: string

  @column()
  declare address: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CartItem, {
    localKey: 'id',
    foreignKey: 'orderId',
  })
  declare cartItems: HasMany<typeof CartItem>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>
}
