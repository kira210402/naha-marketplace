import { BaseSchema } from '@adonisjs/lucid/schema'
import { EUserRole } from '../../app/enums/EUserRole.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role').defaultTo(EUserRole.BUYER).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
