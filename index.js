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

// Handle OPTIONS requests (CORS Preflight)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Respond to OPTIONS request without redirect
  }
  next();
});

// CORS Middleware (Now handles the preflight properly)
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Include OPTIONS method
  allowedHeaders: ["Content-Type", "Authorization"],  // Headers for preflight
  credentials: true,  // If you need to handle cookies or sessions
}));

// Passport Authentication Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Log incoming requests (useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/auth", githubUserRoutes);
app.use(userRoute);
app.use(homePageRoutes);
app.use(matchesRequestroutes);
app.use(userMatchesRoutes);
app.use(messageRoutes);
app.use(aiBotRoutes);

// Set up the Socket.io server
const server = http.createServer(app);
const io = setupSocketServer(server);

// Sequelize Relationships
User.hasOne(profile);
profile.belongsTo(User);
User.hasMany(matchesRequest);
matchesRequest.belongsTo(User);

// Sync DB
db.sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.error("Error syncing database:", err));

// Cron job (Optional, if you need scheduled tasks)
cron.schedule('*/10 * * * *', () => {
  console.log('Running a task every 10 minutes');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
