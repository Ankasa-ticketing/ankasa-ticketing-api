const express = require("express");
const userController = require("../controller/userController");
const uploadPhoto = require("../middleware/uploadPhoto");
const uploadImage = require("../middleware/uploadImage");
const airlinesController = require("../controller/airlinesController");
const { fetchAirlines, insertAirlines, deleteAirlines, editAirlines } =
  airlinesController;
const { fetchUsers, register, login, editProfile, editPhoto } = userController;
const { validate } = require("../middleware/validation");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../helper/validationSchema");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// user
router.get("/", fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.put("/users_photo", uploadPhoto, editPhoto);

// airlines
router.get("/airlines", fetchAirlines);
router.post("/airlines", uploadImage, insertAirlines);
router.delete("/airlines/:id", deleteAirlines);
router.put("/airlines/:id", uploadImage, editAirlines);
router.put("/users", verifyToken, validate(updateProfileSchema), editProfile);

module.exports = { router };
