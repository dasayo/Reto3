import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {

  public async postRegistrarUsuario({ request, response, auth }: HttpContextContract) {
    const dataUser = request.only(['name', 'surname', 'typeId', 'idNumber', 'address', 'municipio',
     'departamento', 'barrio', 'email', 'password', 'idPerfil'])

    try{
      const idNumber = dataUser.idNumber;
      const total = await this.getValidarUsuarioExistente(idNumber);
      console.log(total)
      if(total == 0){
        console.log('hola');
        const user = await User.create(dataUser);
        const token = await auth.use('api').generate(user, {
          expiresIn: '2 minutes'
        })

        return response.status(200).json({ message: 'Usuario creado', token: token })

      }else{
        return response.status(400).json({ message: 'El usuario ya existe'});
      }
    }catch(error){
      console.log(error)
      return response.status(500).json({ message: 'Error al crear el usuario'});
    }

  }

  public async postLoginUsuario({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try{
      const idUser = await (await User.findByOrFail('email', email)).idNumber
      if( await this.getValidarUsuarioExistente(idUser) === 0 ){
        return response.status(400).json({ message: 'Email incorrecto'});
      }else {
        const token = await auth.use('api').attempt(email, password, {
          expiresIn: '30 minutes'
        })
        return response.status(200).json({ message: 'Usuario logueado', token: token })
      }
    }catch(error){
      return response.status(500).json({ message: 'Password incorrecta'});
    }
  }

  public async getValidarUsuarioExistente(idNum: string) {
    const total = await User.query().where('idNumber', idNum).count('* as total')
    return total[0].total;
  }

  public async getUsuarios({ response, auth }: HttpContextContract) {
    console.log(auth.user?.email);

    if(auth.user?.idPerfil == 1){
      const users = await User.all()
      return response.status(200).json({ users })
    }else{
      return response.status(401).json({msg: 'No autorizado Para ver usuarios'})
    }

  }

  public async getUsuario({ response, params, auth }: HttpContextContract) {
    if(auth.user?.idPerfil == 1){
      const user = await User.find(params.id)
      return response.status(200).json({ user })
    }else{
      return response.status(401).json({msg: 'No autorizado Para ver usuarios'})
    }
  }

  public async updateUsuario({ request, response, params, auth }: HttpContextContract) {
    const dataUser = request.only(['name', 'surname', 'typeId', 'idNumber', 'address', 'municipio',
      'departamento', 'barrio', 'email', 'password', 'idPerfil'])
    const user = await User.query().where('idNumber', params.id)
    if(auth.user?.idPerfil == 1){
      user[0].name = dataUser.name
      user[0].surname = dataUser.surname
      user[0].typeId = dataUser.typeId
      user[0].idNumber = dataUser.idNumber
      user[0].address = dataUser.address
      user[0].municipio = dataUser.municipio
      user[0].departamento = dataUser.departamento
      user[0].barrio = dataUser.barrio
      user[0].email = dataUser.email
      user[0].password = dataUser.password
      user[0].idPerfil = dataUser.idPerfil
      await user[0].save()
      return response.status(200).json({ msg: "Usuario actualizado correctamente", user })
    }else if(auth.user?.idNumber == params.id){
      user[0].name = dataUser.name
      user[0].surname = dataUser.surname
      user[0].typeId = dataUser.typeId
      user[0].idNumber = dataUser.idNumber
      user[0].address = dataUser.address
      user[0].municipio = dataUser.municipio
      user[0].departamento = dataUser.departamento
      user[0].barrio = dataUser.barrio
      user[0].email = dataUser.email
      user[0].password = dataUser.password
      await user[0].save()
      return response.status(200).json({ msg: "Usuario actualizado correctamente", user })
    }else{
      return response.status(401).json({msg: 'No autorizado Para actualizar usuario diferente al suyo'})
    }
  }

}
