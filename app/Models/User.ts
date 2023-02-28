import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Book from './Book'

import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public surname: string

  @column({columnName: 'typeId'})
  public typeId: string

  @column({columnName: 'idNumber'})
  public idNumber: string

  @column()
  public address: string

  @column()
  public municipio: string

  @column()
  public departamento: string

  @column()
  public barrio: string

  @column({columnName: 'idPerfil'})
  public idPerfil: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany (() => Book, {
    foreignKey: 'idNumber'
  })

  public book: HasMany<typeof Book>


}
