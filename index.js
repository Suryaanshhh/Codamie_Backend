const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const db = require("./Database/mySql");
const User = require("./Model/user");
const profile = require("./Model/userProfile");
const matchesRequest = require("./Model/matchesRequest");
const userMatchesRoutes = require("./Routes/userMatches");
const userMatches = require("./Model/matches");
const userRoute = require("./Routes/userRoutes");
const session = require("express-session");
const passport = require("./Controller/githubAuth");
const githubUserRoutes = require("./Routes/githuUserRoutes");
const homePageRoutes = require("./Routes/homepage");
const matchesRequestroutes = require("./Routes/matchesRequestRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const aiBotRoutes = require("./Routes/botRoutes");
const setupSocketServer = require("./Middlewares/sockets");
const cron = require("node-cron");

const app = express();

// ✅ Set up proper CORS config first
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS requests correctly
app.options('*', cors(corsOptions));

// ✅ Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Session + Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Log requests (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
