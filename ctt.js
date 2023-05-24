const { ticketModel } = require("./src/model/ticket_model");

const input = {
  airlineId: 1,
  from: "jkt",
  destination: "bdg",
  departureTime: "09:00:00",
  timeArrived: "09:00:00",
  kelas: "ekonomi",
  price: 12000,
};

console.log({ ...input, id: 2 });

// ticketModel
//   .insertTicket(input)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
