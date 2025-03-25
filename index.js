import express from "express";
import bodyParser from "body-parser";
import db from "./Database/mySql.js"
import User from "./Model/user.js";
import userRoute from "./Routes/userRoutes.js"

const app = express();
db.sync()  // or { alter: true }
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.error("Error syncing database:", err));
app.use(bodyParser.json())
app.use(userRoute)


app.listen(3000)
