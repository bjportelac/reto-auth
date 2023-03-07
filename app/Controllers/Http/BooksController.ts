import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Book from "App/Models/Book";

export default class BooksController {
  public async storeBook({ request, response }: HttpContextContract) {
    try {
      const book = new Book();
      book.title = request.input("title");
      book.author = request.input("author");

      if (await book.save()) {
        return response.created({
          book,
          message: "Book successfuly stored.",
        });
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to store the book",
        error,
      });
    }
  }

  public async indexBooks({ response }: HttpContextContract) {
    try {
      const books = await Book.query();
      if (books) {
        return response.ok({ books });
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to fetch the books",
        error,
      });
    }
  }

  public async searchBook({ params, response }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        return response.ok({ book });
      } else {
        return response.noContent();
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to fetch the books",
        error,
      });
    }
  }

  public async updateBook({ request, response, params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        book.title = request.input("title");
        book.author = request.input("author");

        if (await book.save()) {
          return response.ok({
            message: "Book info has been updates succesfully",
            book,
          });
        }
        return response.noContent();
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to fetch the books",
        error,
      });
    }
  }
}
