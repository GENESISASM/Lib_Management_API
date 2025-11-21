const pool = require('../config/database');

class Book {
  static async findAll(filters = {}, page = 1, limit = 10) {
    const { title, author } = filters;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, title, author, published_year, stock, isbn, 
             created_at, updated_at,
             stock > 0 as available
      FROM books 
      WHERE 1=1
    `;
    const params = [];
    
    if (title) {
      params.push(`%${title}%`);
      query += ` AND title ILIKE $${params.length}`;
    }
    
    if (author) {
      params.push(`%${author}%`);
      query += ` AND author ILIKE $${params.length}`;
    }
    
    try {
      // Count total records
      const countQuery = `SELECT COUNT(*) FROM (${query}) as count_query`;
      const countResult = await pool.query(countQuery, params);
      const total = parseInt(countResult.rows[0].count);
      
      // Add pagination
      params.push(limit, offset);
      query += ` ORDER BY title LIMIT $${params.length - 1} OFFSET $${params.length}`;
      
      const result = await pool.query(query, params);
      
      return {
        data: result.rows,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM books WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async updateStock(id, change) {
    try {
      const result = await pool.query(
        'UPDATE books SET stock = stock + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [change, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Book;