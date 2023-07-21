const DB = require("../config/postgres");

const bookingModel = {
  findAll: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `
        SELECT bookings.*, tickets.airline_id,tickets.from_location,tickets.destination, 
        tickets.departure_time, tickets.class,tickets.price,tickets.created_at, 
        airlines.name, airlines.image
        FROM bookings
        JOIN tickets ON bookings.ticket_id = tickets.id
        JOIN airlines ON tickets.airline_id = airlines.id
        WHERE user_id = ${id}
        `,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  find: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `
        SELECT bookings.*, tickets.airline_id,tickets.from_location,tickets.destination,
        tickets.departure_time, tickets.class,tickets.price,tickets.created_at, 
        airlines.name, airlines.image
        FROM bookings
        JOIN tickets ON bookings.ticket_id = tickets.id
        JOIN airlines ON tickets.airline_id = airlines.id
        WHERE bookings.id = ${id}
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
