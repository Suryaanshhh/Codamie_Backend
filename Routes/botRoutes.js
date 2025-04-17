const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();
const botController = require("../Controller/aiBot.js")

router.post("/aiBot",botController)

module.exports=router
