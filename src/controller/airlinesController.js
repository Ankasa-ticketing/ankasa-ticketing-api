const { generateRandomString } = require("../helper/generate_random_string");
const airlinesModel = require("../model/airlines_model");
const { uploadFile, MinioClient } = require("../utils/object_storage");

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
    const { name } = req.body;
    const file = req.file.path;

    try {
      const image_url = generateRandomString(10);
      uploadFile(file, `airlines/${image_url}`);

      const presignedUrl = await MinioClient.presignedGetObject(
        "ankasa-ticketing",
        `airlines/${image_url}`
      );

      await airlinesModel.insert(name, presignedUrl);

      res.status(201).json({
        msg: "berhasil menambahkan data",
        data: {
          name,
          url: presignedUrl,
        },
      });
    } catch (error) {
      res.status(400).json({ msg: "gagal tambah data!", error });
    }
  },

  editAirlines: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const file = req.file.path;

    try {
      const image_url = generateRandomString(10);
      uploadFile(file, `airlines/${image_url}`);

      const presignedUrl = await MinioClient.presignedGetObject(
        "ankasa-ticketing",
        `airlines/${image_url}`
      );

      await airlinesModel.update(id, name, presignedUrl);
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
