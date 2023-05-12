const express = require("express");
const router = express.Router();
const { authValidation } = require("../../middlewares");
const { registerUser, loginUser } = require("../../controllers/authController");

router.post("/register", authValidation, registerUser);
router.post("/login", authValidation, loginUser);

module.exports = { authRouter: router };
