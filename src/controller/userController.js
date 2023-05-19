const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.json({ message: "failed hash password" });
        }
        const data = { fullname, email, password: hash };
        userModel
          .insertUsers(data)
          .then((result) => {
            res.status(201).json({ fullname, email, password });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findByEmail(email);
      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(400).json({ msg: "password salah!" });

      const { id, fullname, role } = user;
      const accessToken = jwt.sign(
        { id, fullname, email, role },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ fullname, email, accessToken });
    } catch (error) {
      res.status(400).json({ msg: "email tidak ditemukan!", errors: error });
      console.log(error);
    }
  },
};

module.exports = userController;
