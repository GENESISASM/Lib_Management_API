const Borrowing = require('../models/borrowing');
const Book = require('../models/book');
const Member = require('../models/member');
const pool = require('../config/database');

class BorrowingService {
  static async borrowBook(borrowData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      const { book_id, member_id } = borrowData;

      // Check if book exists
      const book = await Book.findById(book_id);
      if (!book) {
        throw new Error('Book not found');
      }
      if (book.stock <= 0) {
        throw new Error('Book is out of stock');
      }

      // Check if member exists
      const member = await Member.findById(member_id);
      if (!member) {
        throw new Error('Member not found');
      }

      // Check if member has less than 3 active borrowings
      const activeBorrowings = await Member.getBorrowingCount(member_id);
      if (activeBorrowings >= 3) {
        throw new Error('Member cannot borrow more than 3 books');
      }

      // Decrease book stock
      await Book.updateStock(book_id, -1);

      // Create borrowing record
      const borrowDate = new Date().toISOString().split('T')[0];
      const borrowing = await Borrowing.create({
        book_id,
        member_id,
        borrow_date: borrowDate
      });

      await client.query('COMMIT');
      return borrowing;

    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Error borrowing book: ${error.message}`);
    } finally {
      client.release();
    }
  }

  static async returnBook(borrowingId) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Check if borrowing record exists
      const borrowing = await Borrowing.findById(borrowingId);
      if (!borrowing) {
        throw new Error('Borrowing record not found');
      }

      if (borrowing.status === 'RETURNED') {
        throw new Error('Book already returned');
      }

      // Increase book stock
      await Book.updateStock(borrowing.book_id, 1);

      // Update borrowing record
      const returnDate = new Date().toISOString().split('T')[0];
      const updatedBorrowing = await Borrowing.updateReturn(borrowingId, returnDate);

      await client.query('COMMIT');
      return updatedBorrowing;

    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Error returning book: ${error.message}`);
    } finally {
      client.release();
    }
  }
}

module.exports = BorrowingService;