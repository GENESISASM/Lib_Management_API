const BorrowingService = require('../services/borrowingService');

const borrowingController = {
  borrowBook: async (req, res) => {
    try {
      const borrowing = await BorrowingService.borrowBook(req.body);
      
      res.status(201).json({
        success: true,
        data: borrowing,
        message: 'Book borrowed successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  returnBook: async (req, res) => {
    try {
      const { id } = req.params;
      const borrowing = await BorrowingService.returnBook(id);
      
      res.json({
        success: true,
        data: borrowing,
        message: 'Book returned successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = borrowingController;