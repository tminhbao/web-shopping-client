const express = require('express');
const router = express.Router();
const checkoutController = require('../app/controllers/CheckoutController');
router.use('/',checkoutController.index);
module.exports = router;