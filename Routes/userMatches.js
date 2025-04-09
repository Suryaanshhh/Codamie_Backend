const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();

const {addMatch,removeMatch}=require("../Controller/userMatches.js")

router.post("/addToMatch",authentication,addMatch)


router.post("/removeMatch",authentication,removeMatch)


module.exports=router