const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { fetchUsers, register, login, editProfile, editPhoto } = userController;
const { validate } = require("../middleware/validation");
const { registerSchema, loginSchema } = require("../helper/validationSchema");
const upload = require("../middleware/uploadImage");

router.get("/", fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.put("/users", editProfile);
router.put("/users_photo", upload, editPhoto);

module.exports = { router };
