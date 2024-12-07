const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookingController");

// Existing routes
router.post("/bookcar", bookingController.bookCar);
router.get("/getallbookings", bookingController.getAllBookings);

// New route for payment verification
router.post("/payment-verification", bookingController.paymentVerification);

module.exports = router;