const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();
const {matchRequestCreate,matchRequestAccept,matchRequestReject ,showMatches}=require("../Controller/matchRequest.js")

router.post("/createMatchRequest", authentication, matchRequestCreate)

router.post("/acceptMatchRequest", authentication, matchRequestAccept)

router.post("/rejectMatchRequest", authentication, matchRequestReject)

router.get("/showMatchRequests",authentication, showMatches)

module.exports=router