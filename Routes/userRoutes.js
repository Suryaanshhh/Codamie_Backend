const express = require("express");
const signupController = require("../Controller/signUp")
const loginController = require("../Controller/login.js")
const router = express.Router();

router.post("/registerUser", signupController);

router.post("/loginUser", loginController)

module.exports = router