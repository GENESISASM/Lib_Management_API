const pool = require('../config/database');

class Member {
    static async create(memberData) {
        const { name, email, phone, address} = memberData;
        const result = await pool.query(
            `INSERT INTO members (name, email, phone, address, created_at, updated_at)
             VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT)
             RETURNING *`,
            [name, email, phone, address]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT * FROM members WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query(
            `SELECT * FROM members WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }

    static async getBorrowingCount(memberId) {
        const result = await pool.query(
            `SELECT COUNT(*) FROM borrowings WHERE member_id = $1 AND status = 'borrowed'`,
            [memberId]
        );
        return parseInt(result.rows[0].count);
    }
}

module.exports = Member;