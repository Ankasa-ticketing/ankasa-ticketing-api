const DB = require("../config/postgres");

const ticketModel = {
  insertTicket: (input) => {
    const {
      airlineId,
      from,
      destination,
      departureTime,
      timeArrived,
      kelas,
      price,
    } = input;

    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO tickets 
        (airline_id, from_location, destination, departure_time, time_arrived, class, price) 
        VALUES 
        ('${airlineId}','${from}','${destination}','${departureTime}','${timeArrived}','${kelas}','${price}')
        RETURNING id`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT tickets.*,
        airlines.name, airlines.image,
        detail_tickets.luggage, detail_tickets.wifi, detail_tickets.meal, detail_tickets.transit,
        detail_tickets.refundable, detail_tickets.reschedule 
      FROM tickets
      INNER JOIN airlines ON tickets.airline_id = airlines.id
      INNER JOIN detail_tickets ON tickets.id = detail_tickets.ticket_id`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },
};

module.exports = { ticketModel };
