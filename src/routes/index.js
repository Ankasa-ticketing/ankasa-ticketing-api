const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

const { fetchUsers } = userController;

router.get("/", fetchUsers);

module.exports = { router };
