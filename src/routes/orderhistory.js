const express = require("express");
const router = express.Router();
const orderHistoryController = require("../app/controllers/OrderHistoryController");
const loginController = require("../app/controllers/LoginController");
router.get("/", loginController.checkLoggedIn, orderHistoryController.index);
module.exports = router;
