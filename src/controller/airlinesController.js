const airlinesModel = require("../model/airlines_model");
// const jwt = require("jsonwebtoken");

const airlinesController = {
  fetchAirlines: async (req, res) => {
    try {
      const airlines = await airlinesModel.findAll();
      res.status(200).json({ data: airlines });
    } catch {
      res.status(500).json({ server_error: error });
    }
  },

  insertAirlines: async (req, res) => {
    try {
      const { name } = req.body;
      const image = req.file.filename;
      const data = { name, image };

      airlinesModel
        .insert(data)
        .then((result) => {
          res.status(201).json({ name, image });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  editAirlines: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const image = req.file.filename;
    try {
      await airlinesModel.update(id, name, image);
      res.status(200).json({ msg: "berhasil memperbaharui airlines" });
    } catch (error) {
      res.json(error);
      console.log(error);
      res.json({ msg: "gagal memperbaharui airlines" });
    }
  },

  deleteAirlines: async (req, res) => {
    try {
      const id = req.params.id;
      airlinesModel
        .remove(id)
        .then((result) => {
          res.status(200).json({ msg: "data berhasil dihapus" });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = airlinesController;
