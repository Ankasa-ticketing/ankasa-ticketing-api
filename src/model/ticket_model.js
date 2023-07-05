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

  findAll: (search = "", airline = "", perPage = 5, page = 1) => {
    const offset = (page - 1) * perPage;
    let query = `SELECT tickets.*,
    airlines.name, airlines.image,
    detail_tickets.luggage, detail_tickets.wifi, detail_tickets.meal, detail_tickets.transit,
    detail_tickets.refundable, detail_tickets.reschedule 
    FROM tickets
    INNER JOIN airlines ON tickets.airline_id = airlines.id
    INNER JOIN detail_tickets ON tickets.id = detail_tickets.ticket_id
    `;

    if (search !== "")
      query += `WHERE tickets.destination LIKE '%${search}%' OR tickets.from_location LIKE '%${search}%'`;
    if (airline !== "") query += `WHERE tickets.airline_id = '${airline}'`;
    if (perPage !== "" && page !== "")
      query += `limit ${perPage} offset ${offset}`;
    return new Promise((resolve, reject) => {
      DB.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  },

  find: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT tickets.*,
        airlines.name, airlines.image,
        detail_tickets.luggage, detail_tickets.wifi, detail_tickets.meal, detail_tickets.transit,
        detail_tickets.refundable, detail_tickets.reschedule 
      FROM tickets
      INNER JOIN airlines ON tickets.airline_id = airlines.id
      INNER JOIN detail_tickets ON tickets.id = detail_tickets.ticket_id
      WHERE tickets.id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },
};

module.exports = { ticketModel };
