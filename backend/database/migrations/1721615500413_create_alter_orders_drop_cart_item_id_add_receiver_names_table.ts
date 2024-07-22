import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('cart_item_id')
      table.text('receiver_names').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('cart_item_id').unsigned().references('cart_items.id').onDelete('CASCADE')
      table.dropColumn('receiver_names')
    })
  }
}