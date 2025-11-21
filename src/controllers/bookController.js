const BookService = require('../services/bookService');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const { title, author, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (title) filters.title = title;
      if (author) filters.author = author;

      const result = await BookService.getAllBooks(filters, parseInt(page), parseInt(limit));
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = bookController;