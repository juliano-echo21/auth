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
import UserPermission from "App/Middleware/UserPermission";

Route.group(() => {
  // el usuario basico solo puede regista
  Route.post("/register", "AuthController.resgister");
  Route.post("/login", "AuthController.login");

  Route.group(() => {
    Route.get("/users", "UsersController.show");
    Route.put("/updateUser/:id", "UsersController.update");
    Route.get("/userById/:id", "UsersController.index");

    Route.group(() => {
      Route.get("/books", "BooksController.index");
      Route.put("/books/update/:id", "BooksController.update");
      Route.post("/books", "BooksController.store");
    }).middleware(["userPermission"]);
  }).middleware("auth");
}).prefix("/api");
