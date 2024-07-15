import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('status').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
