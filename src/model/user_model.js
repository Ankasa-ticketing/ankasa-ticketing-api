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
    const photo =
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg";
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO users (fullname, email, password, role, photo) VALUES ('${fullname}','${email}','${password}','user', '${photo}')`,
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

  updateProfile: (id, fullname, email, phone, city, address, post_code) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE users SET 
        fullname = '${fullname}', email = '${email}', phone = '${phone}', city = '${city}',
        address = '${address}', post_code = '${post_code}'
        WHERE id = '${id}' `,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updatePhoto: (id, { photo }) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE users SET photo = '${photo}' WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = userModel;
