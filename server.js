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
app.use(cors({ origin: ['http://localhost:3000', process.env.CLIENT_URL], methods: ["GET", "POST"], credentials: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
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
app.use("/api/bookings/", require("./Routes/bookServicesRoute"));

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
