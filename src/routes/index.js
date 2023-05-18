const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

const { fetchUsers, register } = userController;

router.get("/", fetchUsers);
router.post("/register", register);

module.exports = { router };
