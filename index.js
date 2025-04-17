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
app.options('*', (req, res) => {
  res.status(200).send();   // Respond with status code 200, no redirect
});

const corsOptions = {
  origin: "http://localhost:5173",    // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,    // Allow cookies, if necessary
  preflightContinue: false,   // Explicitly stop the request from continuing after preflight
  optionsSuccessStatus: 200  // Force 200 status code instead of redirects for preflight
};

// Apply the CORS middleware
app.use(cors(corsOptions));


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
