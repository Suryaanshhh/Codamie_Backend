import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import db from "./Database/mySql.js"
import User from "./Model/user.js";
import profile from "./Model/userProfile.js";
import userRoute from "./Routes/userRoutes.js"

const app = express();
app.use(cors())
User.hasOne(profile);
profile.belongsTo(User)
db.sync({force:true})  // or { alter: true }
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.error("Error syncing database:", err));
app.use(bodyParser.json())
app.use(userRoute)


app.listen(3000)
