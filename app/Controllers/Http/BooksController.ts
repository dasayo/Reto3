import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'


export default class BooksController {


  public async registrarBook({ request ,response, auth }: HttpContextContract) {
    const dataBook = request.only(['title', 'author', 'editorial', 'format', 'pages', 'idNumber'])
    if(auth.user?.idPerfil == 1 ){
      const book = await Book.create(dataBook)
      return response.status(201).json({msg: 'Libro registrado', book})
    }else if(auth.user?.idPerfil == 2){
      const book = new Book()
      book.title = dataBook.title
      book.author = dataBook.author
      book.editorial = dataBook.editorial
      book.format = dataBook.format
      book.pages = dataBook.pages
      book.idNumber = auth.user?.idNumber
      await book.save()
      return response.status(201).json({msg: 'Libro registrado', book})
    }else {
      return response.status(401).json({msg: 'No autorizado Para crear libros'})
    }
  }

  public async getBooks({ response}: HttpContextContract) {
    const books = await Book.all()
    return response.status(200).json({ books })
  }

  public async getBook({ response, params }: HttpContextContract) {
    const book = await Book.find(params.id)
    return response.status(200).json({ book })
  }

  public async updateBook({ request, response, params, auth }: HttpContextContract) {
    const dataBook = request.only(['title', 'author', 'editorial', 'format', 'pages', 'idNumber'])
    const book = await Book.find(params.id)
    if(auth.user?.idPerfil == 1){
      book?.merge(dataBook)
      await book?.save()
      return response.status(200).json({msg: 'Libro actualizado', book})
    }else if ((auth.user?.idPerfil == 2 && auth.user?.idNumber == book?.idNumber)){
      book.title = dataBook.title
      book.author = dataBook.author
      book.editorial = dataBook.editorial
      book.format = dataBook.format
      book.pages = dataBook.pages
      await book.save()
      return response.status(200).json({msg: 'Libro actualizado', book})
    }else{
      return response.status(401).json({msg: 'No autorizado Para actualizar libros'})
    }
  }

}
