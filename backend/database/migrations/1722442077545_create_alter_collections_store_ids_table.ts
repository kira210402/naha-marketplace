import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['store_id'])
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE').alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['store_id'])
      table.integer('store_id').unsigned().references('id').inTable('stores').alter()
    })
  }
}