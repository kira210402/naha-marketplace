import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table.string('name')
      table.string('description')
      table.string('price')
      table.integer('quantity')
      table.integer('discount')
      table.text('image').defaultTo('https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}