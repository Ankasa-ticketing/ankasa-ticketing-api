const DB = require("../config/postgres");

const detailTicket = {
  insertDetail: (input) => {
    const { ticket_id, luggage, wifi, meal, transit, refundable, reschedule } =
      input;

    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO detail_tickets 
                (ticket_id, luggage, wifi, meal, transit, refundable, reschedule) 
                VALUES 
                ('${ticket_id}','${luggage}','${wifi}','${meal}','${transit}','${refundable}','${reschedule}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = detailTicket;
