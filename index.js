const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./Controller/githubAuth");
const db = require("./Database/mySql");

// Models
const User = require("./Model/user");
const Profile = require("./Model/userProfile");
const MatchesRequest = require("./Model/matchesRequest");

// Routes
const userRoute = require("./Routes/userRoutes");
const githubUserRoutes = require("./Routes/githuUserRoutes");
const homePageRoutes = require("./Routes/homepage");
const matchesRequestRoutes = require("./Routes/matchesRequestRoutes");
const userMatchesRoutes = require("./Routes/userMatches");
const messageRoutes = require("./Routes/messageRoutes");
const aiBotRoutes = require("./Routes/botRoutes");

// Sockets and Cron
const { Server } = require("socket.io");
const setupSocketServer = require("./Middlewares/sockets");
const cron = require("node-cron");

// Initialize app
const app = express();
const server = http.createServer(app);
const io = setupSocketServer(server);

// --- MIDDLEWARES ---
app.options('*', cors());
// ✅ CORS must be first
app.use(cors({
  origin: "http://localhost:5173",   // or your frontend URL in production
  credentials: true,                 // Allow cookies/session across domains
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// ✅ Trust proxy if deploying (needed for Railway/Render/Heroku)
app.set('trust proxy', 1);

// Body parser
app.use(bodyParser.json());

// Logger (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Session
app.use(session({ 
  secret: process.env.SESSION_SECRET || "defaultsecret", 
  resave: false, 
  saveUninitialized: true 
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// --- MODELS RELATIONSHIPS ---

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(MatchesRequest);
MatchesRequest.belongsTo(User);

// --- ROUTES ---

app.use("/auth", githubUserRoutes);
app.use(userRoute);
app.use(homePageRoutes);
app.use(matchesRequestRoutes);
app.use(userMatchesRoutes);
app.use(messageRoutes);
app.use(aiBotRoutes);

// --- DATABASE SYNC ---

db.sync()
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

// --- CRON JOBS ---

cron.schedule('*/10 * * * *', () => {
  console.log('Running cron job every 10 minutes...');
});

// --- START SERVER ---

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
