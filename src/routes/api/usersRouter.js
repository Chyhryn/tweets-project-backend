const express = require("express");
const router = express.Router();

const { getUsers, changeUser } = require("../../controllers/usersController");

router.get("/", getUsers);
router.put("/:id", changeUser);

module.exports = { usersRouter: router };
