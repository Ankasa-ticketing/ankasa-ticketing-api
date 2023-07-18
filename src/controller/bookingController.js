const jwt = require("jsonwebtoken");
const generateRandomCode = require("../helper/generate_random_code");
const { insert, findAll, find } = require("../model/booking_model");

const bookingController = {
  insertBooking: async (req, res) => {
    const token = req.cookies.accessToken;
    const user = jwt.decode(token, { complete: true });
    const { insurance } = req.body;
    const { ticket_id } = req.params;
    const code = generateRandomCode();

    try {
      const input = {
        ticket_id: parseInt(ticket_id),
        user_id: user.payload.id,
        code,
        terminal: "A",
        gate: 223,
        insurance,
        paymentStatus: "checking",
      };
      await insert(input);

      res.status(201).json({ message: "berhasil booking", data: input });
    } catch (error) {
      res.json({ message: "gagal booking", error });
      console.log(error);
    }
  },

  fecthMyBooking: async (req, res) => {
    const token = req.cookies.accessToken;
    const user = jwt.decode(token, { complete: true });
    try {
      const response = await findAll(user.payload.id);
      res.status(200).json({ message: "data bookings", data: response });
    } catch (error) {
      res.json({ message: "gagal booking", error });
    }
  },

  detailBooking: async (req, res) => {
    const { id } = req.params

    try {
      const response = await find(id)
      res.status(200).json({ message: "data booking", data: response });
    } catch (error) {
      res.json({ message: "gagal booking", error });
    }
  }
};

module.exports = bookingController;
