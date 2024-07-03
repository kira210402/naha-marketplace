import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('price')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
