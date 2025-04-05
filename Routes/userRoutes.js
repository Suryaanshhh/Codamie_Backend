const express = require("express");
const signupController = require("../Controller/signUp")
const loginController = require("../Controller/login.js")
const authentication=require("../Middlewares/authentication.js")
const profileCreationController=require("../Controller/userProfile.js")
const router = express.Router();

router.post("/registerUser", signupController);

router.post("/loginUser", loginController);

router.post("/createUserProfile",authentication,profileCreationController);



module.exports = router