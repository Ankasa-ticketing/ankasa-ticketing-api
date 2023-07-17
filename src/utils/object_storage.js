const minio = require("minio");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const MinioClient = new minio.Client({
  endPoint: process.env.S3_ENDPOINT,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  port: 443,
  useSSL: true,
});

const uploadFile = (path, objectName) => {
  fs.readFile(path, function (err, data) {
    if (err) {
      return res.send(err);
    }
    const metaData = {
      "Content-Type": "image/png, image/jpg, image/jpeg", // sesuaikan dengan jenis file gambar
    };
    MinioClient.putObject(
      `ankasa-ticketing`,
      objectName,
      data,
      metaData,
      function (err, etag) {
        if (err) {
          return res.send(err);
        }
      }
    );
  });
};

module.exports = { MinioClient, uploadFile };
