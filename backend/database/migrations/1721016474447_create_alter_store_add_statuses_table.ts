import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('status').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
