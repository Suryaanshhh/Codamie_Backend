import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import db from "./Database/mySql.js"
import User from "./Model/user.js";
import profile from "./Model/userProfile.js";
import userRoute from "./Routes/userRoutes.js"
import session from "express-session";
import passport from  "./Controller/githubAuth.js"
import githubUserRoutes from "./Routes/githuUserRoutes.js"



// const session = require("express-session");
// const passport = require("./github-auth/passportConfig");
// const githubAuthRoutes = require("./github-auth/githubAuth");




const app = express();
app.use(cors())
User.hasOne(profile);
profile.belongsTo(User)

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", githubUserRoutes);




db.sync({force:true})  // or { alter: true }
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.error("Error syncing database:", err));
app.use(bodyParser.json())
app.use(userRoute)


app.listen(3000)
