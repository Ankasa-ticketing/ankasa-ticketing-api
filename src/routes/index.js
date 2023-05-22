const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { validate } = require("../middleware/validation");
const { registerSchema, loginSchema } = require("../helper/validationSchema");
const uploadPhoto = require("../middleware/uploadPhoto");
const uploadImage = require("../middleware/uploadImage");
const airlinesController = require("../controller/airlinesController");
const { fetchUsers, register, login, editProfile, editPhoto } = userController;
const { fetchAirlines, insertAirlines, deleteAirlines, editAirlines } =
  airlinesController;

// user
router.get("/", fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.put("/users", editProfile);
router.put("/users_photo", uploadPhoto, editPhoto);

// airlines
router.get("/airlines", fetchAirlines);
router.post("/airlines", uploadImage, insertAirlines);
router.delete("/airlines/:id", deleteAirlines);
router.put("/airlines/:id", uploadImage, editAirlines);

module.exports = { router };
