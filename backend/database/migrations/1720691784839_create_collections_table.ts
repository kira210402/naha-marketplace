import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description')
      table.integer('store_id').unsigned().references('id').inTable('stores')
      table.json('products')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}