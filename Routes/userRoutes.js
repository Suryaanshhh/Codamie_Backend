const express=require("express");
const signupController=require("../Controller/signUp")
const router=express.Router();

router.post("/registerUser" ,signupController)

module.exports=router