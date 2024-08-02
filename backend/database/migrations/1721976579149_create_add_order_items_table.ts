import { BaseSchema } from '@adonisjs/lucid/schema'
import { EOrderStatus } from '../../app/enums/EOrderStatus.js'

export default class extends BaseSchema {
  protected tableName = 'add_order_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity')
      table.float('price')
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

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
