const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();

const {addMatch,removeMatch,matchList}=require("../Controller/userMatches.js")

router.post("/addToMatch",authentication,addMatch)


router.post("/removeMatch",authentication,removeMatch)

router.get("/matchList",authentication,matchList)


module.exports=router