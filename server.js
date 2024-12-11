// Import required packages
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Database connection
const dbConnection = require("./Db/db");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://consistent-cars-frontend.onrender.com'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.use("/api/cars/", require("./Routes/carsRoutes"));
app.use("/booking/api/cars/", require("./Routes/carsRoutes"));
app.use("/editcar/api/cars/", require("./Routes/carsRoutes"));
app.use("/api/users/", require("./Routes/usersRoutes"));
app.use("/booking/api/bookings/", require("./Routes/bookingsRoute"));
app.use("/api/bookings/", require("./Routes/bookingsRoute"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // All routes that are not handled by the API should be served by React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port} `);
});
