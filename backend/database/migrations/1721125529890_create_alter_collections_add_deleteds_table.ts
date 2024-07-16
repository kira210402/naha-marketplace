import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('deleted').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}