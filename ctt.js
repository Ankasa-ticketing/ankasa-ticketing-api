const DB = require("./src/config/postgres");

const bookingModel = {
  findAll: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM bookings WHERE user_id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  insert: (input) => {
    const {
      ticket_id,
      user_id,
      code,
      terminal,
      gate,
      insurance,
      paymentStatus,
    } = input;
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO bookings (ticket_id,user_id,code,terminal,gate,insurance,payment_status) 
        VALUES (${ticket_id},${user_id},'${code}','${terminal}',${gate},${insurance},'${paymentStatus}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

try {
  bookingModel.insert({
    ticket_id: 24,
    user_id: 10,
    code: "asdas",
    terminal: "A",
    gate: 122,
    insurance: false,
    paymentStatus: "cek",
  });
  console.log("berhasil");
} catch (error) {
  console.log(error);
}
