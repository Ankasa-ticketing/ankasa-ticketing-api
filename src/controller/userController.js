const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  fetchUsers: async (req, res) => {
    try {
      const users = await userModel.findAll();
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
      console.log(match);

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

  editProfile: async (req, res) => {
    const { fullname, email, phone, city, address, post_code, card_number } =
      req.body;
    const dataToken = process.env.ACCESS_TOKEN;
    const { token } = req.headers;
    const user = jwt.verify(token, dataToken);
    if (user.role !== "user") return res.sendStatus(403);
    try {
      await userModel.updateProfile(
        user.id,
        fullname,
        email,
        phone,
        city,
        address,
        post_code,
        card_number
      );
      res.status(200).json({ msg: "berhasil memperbaharui profile" });
    } catch (error) {
      res.json(error);
      console.log(error);
      res.json({ msg: "gagal memperbaharui profile" });
    }
  },

  editPhoto: async (req, res) => {
    const photo = req.file.filename;
    const data = { photo };
    const dataToken = process.env.ACCESS_TOKEN;
    const { token } = req.headers;
    const user = jwt.verify(token, dataToken);
    if (user.role !== "user") return res.sendStatus(403);
    try {
      await userModel.updatePhoto(user.id, data);
      res.status(200).json({ msg: "berhasil memperbaharui photo profile" });
    } catch (error) {
      res.json(error);
      console.log(error);
      res.json({ msg: "gagal memperbaharui photo profile" });
    }
  },
};

module.exports = userController;
