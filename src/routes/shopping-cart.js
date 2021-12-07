const express = require('express');
const router = express.Router();
const shoppingCartController = require('../app/controllers/ShoppingCartController');
router.use('/',shoppingCartController.index);
module.exports = router;