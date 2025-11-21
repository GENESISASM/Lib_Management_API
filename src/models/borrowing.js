const pool = require('../config/database');

class Borrowing {
    static async create(borrowingData) {
        const { member_id, book_id, borrow_date } = borrowingData;
        const result = await pool.query(
            `INSERT INTO borrowings (member_id, book_id, borrow_date)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [member_id, book_id, borrow_date]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT b.*, bk.title AS book_title, m.name AS member_name
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            JOIN members m ON b.member_id = m.id
            WHERE b.id = $1`,
            [id]
        );
        return result.rows[0];
    }

    static async findByMemberId(memberId, filter = {}, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { status } = filter;

        let query = `
            SELECT b.*, bk.title, bk.author, bk.isbn
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            WHERE b.member_id = $1
        `;
        const params = [memberId];

        if (status) {
            params.push(status);
            query += ` AND b.status = $${params.length}`;
        }

        const countQuery = `SELECT COUNT(*) FROM (${query}) AS count_table`;
        const countResult = await pool.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count);

        params.push(limit, offset);
        query += ` ORDER BY b.borrow_date DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

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
    }

    static async updateStatus(id, returnDate) {
        const result = await pool.query(
            `UPDATE borrowings 
             SET status = 'returned', return_date = $1, updated_at = current_timestamp 
             WHERE id = $2 
             Returning *`,
            [returnDate, id]
        );
        return result.rows[0];
    }
}

module.exports = Borrowing;