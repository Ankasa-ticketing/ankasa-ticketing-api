const multer = require("multer");
const path = require("path");

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg") {
      cb(null, true);
    } else {
      const error = {
        messasge: "file must be JPG or PNG",
      };
      cb(error, false);
    }
  },
});

const uploadImage = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({ messasge: "error when upload file", err });
      console.log(err);
    } else {
      next();
    }
  });
};

module.exports = uploadImage;
