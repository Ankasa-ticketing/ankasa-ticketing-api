const DB = require("../config/postgres");

const bookingModel = {
  findAll: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `
        SELECT bookings.*, tickets.departure_time, tickets.created_at
        FROM bookings
        JOIN tickets ON bookings.ticket_id = tickets.id
        WHERE user_id = ${id}
        `,
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

module.exports = bookingModel;
