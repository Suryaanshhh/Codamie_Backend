const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const cron = require("node-cron");

// Models & DB
const db = require("./Database/mySql");
const User = require("./Model/user");
const profile = require("./Model/userProfile");
const matchesRequest = require("./Model/matchesRequest");
const userMatches = require("./Model/matches");

// Routes
const userMatchesRoutes = require("./Routes/userMatches");
const userRoute = require("./Routes/userRoutes");
const githubUserRoutes = require("./Routes/githuUserRoutes");
const homePageRoutes = require("./Routes/homepage");
const matchesRequestroutes = require("./Routes/matchesRequestRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const aiBotRoutes = require("./Routes/botRoutes");

// Auth & Sockets
const passport = require("./Controller/githubAuth");
const setupSocketServer = require("./Middlewares/sockets");

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://codamie-frontend.vercel.app", // Your frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ✅ Handle OPTIONS preflight requests
app.options("*", cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Session and Passport
app.use(session({
  secret: process.env.SESSION_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use("/auth", githubUserRoutes);
app.use(userRoute);
app.use(homePageRoutes);
app.use(matchesRequestroutes);
app.use(userMatchesRoutes);
app.use(messageRoutes);
app.use(aiBotRoutes);

// ✅ Relationships
User.hasOne(profile);
profile.belongsTo(User);
User.hasMany(matchesRequest);
matchesRequest.belongsTo(User);

// ✅ Database Sync
db.sync()
  .then(() => {
    console.log("✅ Database & tables synced");
  })
  .catch((err) => {
    console.error("❌ DB Sync Error:", err);
  });

// ✅ Cron job (optional)
cron.schedule("*/10 * * * *", () => {
  console.log("⏰ Cron job running every 10 minutes");
});

// ✅ Start HTTP server and socket
const server = http.createServer(app);
const io = setupSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
