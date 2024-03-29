const express = require("express");
const userController = require("../controller/userController");
const uploadPhoto = require("../middleware/uploadPhoto");
const uploadImage = require("../middleware/uploadImage");
const airlinesController = require("../controller/airlinesController");
const ticketsController = require("../controller/ticketsController");
const bookingController = require("../controller/bookingController");
const { fetchAirlines, insertAirlines, deleteAirlines, editAirlines } =
  airlinesController;
const { fetchUsers, register, login, editProfile, editPhoto } = userController;
const { getTickets, postTicket, getTicket } = ticketsController;
const { insertBooking, fecthMyBooking, detailBooking } = bookingController;
const { validate } = require("../middleware/validation");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  insertAirline,
} = require("../helper/validationSchema");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

const router = express.Router();

// user
router.get("/", isAdmin, fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
// router.put("/users_photo", uploadPhoto, editPhoto);
router.put("/users_photo", verifyToken, uploadImage.single("image"), editPhoto);
router.put("/users", verifyToken, validate(updateProfileSchema), editProfile);

// airlines
router.get("/airlines", isAdmin, fetchAirlines);
router.post(
  "/airlines",
  isAdmin,
  uploadImage.single("image"),
  validate(insertAirline),
  insertAirlines
);
router.delete("/airlines/:id", isAdmin, deleteAirlines);
router.put("/airlines/:id", isAdmin, uploadImage.single("image"), editAirlines);

// tickets
router.get("/tickets", verifyToken, getTickets);
router.get("/tickets/:id", verifyToken, getTicket);
router.post("/tickets", isAdmin, postTicket);

// booking
router.get("/bookings", verifyToken, fecthMyBooking);
router.get("/bookings/:id", verifyToken, detailBooking);
router.post("/bookings/:ticket_id", verifyToken, insertBooking);

module.exports = { router };
