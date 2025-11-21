const MemberService = require('../services/memberService');

const memberController = {
  createMember: async (req, res) => {
    try {
      const member = await MemberService.createMember(req.body);
      
      res.status(201).json({
        success: true,
        data: member,
        message: 'Member created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  getMemberBorrowings: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (status) filters.status = status;

      const result = await MemberService.getMemberBorrowings(id, filters, parseInt(page), parseInt(limit));
      
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = memberController;