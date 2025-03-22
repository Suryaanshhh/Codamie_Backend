import express from "express";
import bodyParser from "body-parser";
import db from "./Database/mySql.js"
import User from "./Model/user.js";

const app = express();

db.sync()  // or { alter: true }
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.error("Error syncing database:", err));



app.listen(3000)
