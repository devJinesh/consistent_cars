// routes/bookServicesRoute.js
const express = require('express');
const router = express.Router();
const bookServiceController = require('../controllers/bookServiceController');

router.get('/book-services', bookServiceController.getBookServices);
router.post('/book-service', bookServiceController.bookService);

module.exports = router;