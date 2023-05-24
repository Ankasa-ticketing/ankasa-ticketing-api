const DB = require("../config/postgres");

const airlinesModel = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      DB.query("SELECT * FROM airlines", (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  },

  insert: (name, image) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO airlines (name,image) VALUES ('${name}','${image}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  update: (id, name, image) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE airlines SET name='${name}',image='${image}' where id ='${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(`DELETE FROM airlines where id =${id}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = airlinesModel;
