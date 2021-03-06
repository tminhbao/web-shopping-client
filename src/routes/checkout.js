const express = require("express");
const router = express.Router();
const checkoutController = require("../app/controllers/CheckoutController");
const loginController = require("../app/controllers/LoginController");
router.use("/", loginController.checkLoggedIn, checkoutController.index);
module.exports = router;
