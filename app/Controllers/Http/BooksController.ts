import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Book from "App/Models/Book";
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksController {
  public async store({ request }: HttpContextContract) {
    const book = new Book();
    book.title = request.input("title");
    book.author = request.input("author");
    await book.save();

    return {
      book: book,
      msg: "Registered successfully",
      state: 200,
    };
  }

  public async index() {
    const books = await Book.query();
    return books;
  }

  public async show({ params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        return book;
      } else {
        return "register does not exist";
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const book = await Book.find(params.id);
    if (book) {
      book.title = request.input("title");
      book.author = request.input("author");

      if (await book.save()) {
        return {
          msg: "Updated correctly",
          book,
        };
      }
      return {
        msg: "Could not realize update",
        state: 401,
      };
    }

    return {
      msg: "Register nod found",
      state: 401,
    };
  }
}
