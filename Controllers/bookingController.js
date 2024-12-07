const { v4: uuidv4 } = require("uuid");
const Booking = require("../Models/bookingModel");
const Car = require("../Models/carModel");
const Payment = require("../Models/paymentModel");
const crypto = require("crypto");

exports.bookCar = async (req, res) => {
  const { paymentId } = req.body; // This may need to be adjusted based on your frontend
  try {
    // You can include any initial logic here if needed

    const transactionId = paymentId; // Assuming paymentId is the Razorpay payment ID
    const newBooking = new Booking({
      ...req.body,
      transactionId,
    });

    await newBooking.save();

    const car = await Car.findOne({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);

    await car.save();
    res.send("Your booking is successful");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                   .update(body.toString())
                                   .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Save payment details to the database
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car").populate("user");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
};
