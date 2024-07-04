import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('role_id')
    })
    this.schema.dropTable(this.tableName)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
