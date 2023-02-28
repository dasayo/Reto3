import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 200).notNullable()
      table.string('editorial', 200).notNullable()
      table.string('format', 200).notNullable()
      table.integer('pages').notNullable()
      table.integer('author').unsigned().notNullable()
      table.string('idNumber', 20).notNullable().unique()
      table.foreign('idNumber').references('users.idNumber').
        onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }

  static get batch(){
    return 3
  }
}
