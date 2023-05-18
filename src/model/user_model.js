const DB = require("../config/postgres");

const userModel = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      DB.query("SELECT * FROM users", (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  },
};

module.exports = userModel;
