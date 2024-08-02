import { BaseSchema } from '@adonisjs/lucid/schema'
import { EOrderStatus } from '../../app/enums/EOrderStatus.js'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('status', [
          EOrderStatus.Pending,
          EOrderStatus.Processing,
          EOrderStatus.Delivered,
          EOrderStatus.Delivering,
          EOrderStatus.Cancelled,
        ])
        .defaultTo(EOrderStatus.Pending)
        .notNullable()
    })
  }
}
