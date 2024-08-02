import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('order_id')
    })
  }
}
