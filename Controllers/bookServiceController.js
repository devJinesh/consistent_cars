// controllers/bookServiceController.js
const BookService = require('../Models/bookServiceModel');

exports.getBookServices = async (req, res) => {
    try {
        const services = await BookService.find();
        res.json(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.bookService = async (req, res) => {
    // Handle booking logic
};