import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {

  public async registerPerfil({ request, response }: HttpContextContract) {
    const dataPerfil = request.only(['description'])
    const perfil = await Perfil.create(dataPerfil)
    return response.status(200).json({ message: 'Perfil creado', perfil })
  }

  public async getPerfils({ response, auth }: HttpContextContract) {
    if (auth.user?.idPerfil == 1) {
      const perfils = await Perfil.all()
      return response.status(200).json({ perfils })
    } else {
      return response.status(401).json({ message: 'Solo el admin puede listar perfiles' })
    }
  }

  public async getPerfil({ response, auth, params }: HttpContextContract) {
    if (auth.user?.idPerfil == 1) {

      const perfil = await Perfil.find(params.id)
      return response.status(200).json({ perfil })
    } else {
      return response.status(401).json({ message: 'Solo el admin puede listar perfiles' })
    }
  }

  public async updatePerfil({ request, response, auth, params }: HttpContextContract) {
    if (auth.user?.idPerfil == 1) {
      const dataPerfil = request.only(['description'])
      const perfil = await Perfil.find(params.id)
      perfil?.merge(dataPerfil)
      await perfil?.save()
      return response.status(200).json({ message: 'Perfil actualizado', perfil })
    } else {
      return response.status(401).json({ message: 'Solo el admin puede actualizar perfiles' })
    }
  }



}
