import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description', 200).notNullable()
      table.timestamps(true)

    })

    this.schema.alterTable('users', (table) => {
      table.foreign('idPerfil').references('perfils.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }

  static get batch(){
    return 1
  }
}
