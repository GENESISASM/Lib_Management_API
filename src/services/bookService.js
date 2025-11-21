const Book = require('../models/book');

class BookService {
  static async getAllBooks(filters, page, limit) {
    try {
      return await Book.findAll(filters, page, limit);
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }
}

module.exports = BookService;