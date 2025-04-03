const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();
const profileController = require("../Controller/homepage.js")

router.get("/showProfiles",profileController)

module.exports=router