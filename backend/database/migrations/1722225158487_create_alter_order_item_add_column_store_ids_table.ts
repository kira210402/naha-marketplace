import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('store_id').unsigned().references('id').inTable('stores')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
