import { BaseSchema } from '@adonisjs/lucid/schema'
import { EOrderStatus } from '../../app/enums/EOrderStatus.js'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('store_id').unsigned().references('id').inTable('stores')
      table
        .enum('status', [
          EOrderStatus.Pending,
          EOrderStatus.Processing,
          EOrderStatus.Delivering,
          EOrderStatus.Delivered,
          EOrderStatus.Cancelled,
        ])
        .defaultTo(EOrderStatus.Pending)
        .notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('store_id')
      table.dropColumn('status')
    })
  }
}
