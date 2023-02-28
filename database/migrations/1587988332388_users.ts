import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('surname', 255).notNullable()
      table.string('typeId', 10).notNullable()
      table.string('idNumber', 20).notNullable().unique()
      table.string('address', 255).notNullable()
      table.string('municipio', 255).notNullable()
      table.string('departamento', 255).notNullable()
      table.string('barrio', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('idPerfil').notNullable().unique()

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }

  static get batch(){
    return 2
  }
}
