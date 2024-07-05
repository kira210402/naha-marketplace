import { BaseSchema } from '@adonisjs/lucid/schema'
import { EOrderStatus } from '../../app/enums/EOrderStatus.js'
import { EOrderPayment } from '../../app/enums/EOrderPayment.js'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('status', [
          EOrderStatus.Pending,
          EOrderStatus.Processing,
          EOrderStatus.Delivered,
          EOrderStatus.Cancelled,
        ])
        .defaultTo(EOrderStatus.Pending)
        .notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table
        .enum('payment', [EOrderPayment.Cash, EOrderPayment.VNPay])
        .defaultTo(EOrderPayment.Cash)
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
