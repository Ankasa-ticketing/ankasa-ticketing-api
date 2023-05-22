const express = require("express");
const userController = require("../controller/userController");
const { fetchUsers, register, login, editProfile, editPhoto } = userController;
const { validate } = require("../middleware/validation");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../helper/validationSchema");
const upload = require("../middleware/uploadImage");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.put("/users", verifyToken, validate(updateProfileSchema), editProfile);
router.put("/users_photo", upload, editPhoto);

module.exports = { router };
