const multer = require("multer");
const path = require("path");

// const multerUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./public/images");
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = `${Date.now()}${ext}`;
//       cb(null, filename);
//     },
//   }),

//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext == ".png" || ext == ".jpg") {
//       cb(null, true);
//     } else {
//       const error = {
//         messasge: "file must be JPG or PNG",
//       };
//       cb(error, false);
//     }
//   },
// });

// const uploadImage = (req, res, next) => {
//   const multerSingle = multerUpload.single("image");
//   multerSingle(req, res, (err) => {
//     if (err) {
//       res.json({ messasge: "error when upload file", err });
//       console.log(err);
//     } else {
//       next();
//     }
//   });
// };

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: 5000000 },
});

module.exports = uploadImage;
