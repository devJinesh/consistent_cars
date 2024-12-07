// models/bookServiceModel.js
const mongoose = require('mongoose');

const bookServiceSchema = new mongoose.Schema({
    serviceType: { type: String, required: true }, // e.g., 'Airport Drop', 'Outstation'
    fixedCost: { type: Number, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' } // Reference to cars
});

module.exports = mongoose.model('BookService', bookServiceSchema);