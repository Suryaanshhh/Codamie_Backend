const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();
const {matchRequestCreate,matchRequestAccept,matchRequestReject}=require("../Controller/matchRequest.js")

router.post("/createMatchRequest", authentication, matchRequestCreate)

router.post("/acceptMatchRequest", authentication, matchRequestAccept)

router.post("/rejectMatchRequest", authentication, matchRequestReject)

module.exports=router