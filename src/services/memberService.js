const Member = require('../models/member');
const { v4: uuidv4 } = require('uuid');

class MemberService {
  static async createMember(memberData) {
    try {
      // Validate required fields
      const { name, email, phone, address } = memberData;
      if (!name || !email || !phone || !address) {
        throw new Error('All fields are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Validate phone format (basic validation)
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error('Invalid phone format');
      }

      // Check if email already exists
      const existingMember = await Member.findByEmail(email);
      if (existingMember) {
        throw new Error('Email already exists');
      }

      return await Member.create(memberData);
    } catch (error) {
      throw new Error(`Error creating member: ${error.message}`);
    }
  }

  static async getMemberBorrowings(memberId, filters, page, limit) {
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        throw new Error('Member not found');
      }

      return await Borrowing.findByMemberId(memberId, filters, page, limit);
    } catch (error) {
      throw new Error(`Error fetching member borrowings: ${error.message}`);
    }
  }
}

module.exports = MemberService;