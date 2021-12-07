const express = require('express');
const router = express.Router();
const singleProductController = require('../app/controllers/SingleProductController');
router.use('/',singleProductController.index);
module.exports = router;