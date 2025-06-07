// Import required packages
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require("./Db/db");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Allow all origins during development
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// API Routes
app.use("/api/cars/", require("./Routes/carsRoutes"));
app.use("/api/users/", require("./Routes/usersRoutes"));
app.use("/api/bookings/", require("./Routes/bookingsRoute"));

// Production setup
if (process.env.SERVE_REACT === "true") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});