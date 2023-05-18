const userModel = require("../model/user_model");

const { findAll } = userModel;

const userController = {
  fetchUsers: async (req, res) => {
    try {
      const users = await findAll();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ server_error: error });
    }
  },
};

module.exports = userController;
