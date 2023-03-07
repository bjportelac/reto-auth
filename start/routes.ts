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

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/user/register", "AuthController.registerUser");
  Route.post("/user/login", "AuthController.loginUser");

  Route.group(() => {
    Route.get("/books", "BooksController.indexBooks");
    Route.get("/books/:id", "BooksController.searchBook");
    Route.put("/books/update/:id", "BooksController.updateBook");
    Route.post("/books/store", "BooksController.storeBook");
  }).middleware("auth");

  Route.group(() => {
    Route.get("/profiles","ProfilesController.listProfiles")
  }).middleware(["auth","admin"])
}).prefix("api");
