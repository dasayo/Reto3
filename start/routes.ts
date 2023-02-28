/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/registrarUsuario', 'AuthController.postRegistrarUsuario');
  //Route.post('/registrarPerfil', 'PerfilsController.registerPerfil');
  Route.post('/loginUsuario', 'AuthController.postLoginUsuario');

  Route.group(() => {
    //route for perfils
    Route.post('/registrarPerfil', 'PerfilsController.registerPerfil');
    Route.get('/getPerfils', 'PerfilsController.getPerfils');
    Route.get('/getPerfil/:id', 'PerfilsController.getPerfil');
    Route.put('/updatePerfil/:id', 'PerfilsController.updatePerfil');


    //route for books
    Route.post('/registrarLibro', 'BooksController.registerBook');
    Route.get('/getBooks', 'BooksController.getBooks');
    Route.get('/getBook/:id', 'BooksController.getBook');
    Route.put('/updateBook/:id', 'BooksController.updateBook');

    //route for users
    Route.get('/getUsers', 'authController.getUsuarios');
    Route.get('/getUser/:id', 'authController.getUsuario');
    Route.put('/updateUser/:id', 'authController.updateUsuario');


  }).middleware('auth');


}).prefix('api/library')
