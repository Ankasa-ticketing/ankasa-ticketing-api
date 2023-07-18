const detailTicket = require("../model/detail_ticket_model");
const { ticketModel } = require("../model/ticket_model");

const ticketsController = {
  getTickets: async (req, res) => {
    const { search, airline, page, limit } = req.query;
    try {
      const response = await ticketModel.findAll(search, airline, limit, page);

      res.status(200).json({ message: "list tiket", data: response });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getTicket: async (req, res) => {
    try {
      const response = await ticketModel.find(1);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  postTicket: async (req, res) => {
    const {
      airline_id,
      from,
      destination,
      departure_time,
      time_arrived,
      kelas,
      price,
      luggage,
      wifi,
      meal,
      transit,
      refundable,
      reschedule,
    } = req.body;

    const input = {
      airlineId: airline_id,
      from,
      destination,
      departureTime: departure_time,
      timeArrived: time_arrived,
      kelas,
      price,
    };

    const inputDetail = {
      luggage,
      wifi,
      meal,
      transit,
      refundable,
      reschedule,
    };

    try {
      const response = await ticketModel.insertTicket(input);
      await detailTicket.insertDetail({
        ...inputDetail,
        ticket_id: response.id,
      });

      res.status(201).json({ msg: "berhasil menambahkan tiket" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = ticketsController;
