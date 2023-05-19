const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { fetchUsers, register, login } = userController;
const { validate } = require("../middleware/validation");
const { registerSchema, loginSchema } = require("../helper/validationSchema");

router.get("/", fetchUsers);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = { router };
