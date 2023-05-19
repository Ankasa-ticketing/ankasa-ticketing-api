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

  insertUsers: ({ fullname, email, password }) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO users (fullname, email, password, role) VALUES ('${fullname}','${email}','${password}','user')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },
};

module.exports = userModel;
