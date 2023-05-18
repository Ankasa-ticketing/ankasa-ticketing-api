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

  register: (req, res) => {
    const { fullname, email, password } = req.body;

    res.status(201).json({ data: { fullname, email, password } });
  },
};

module.exports = userController;
