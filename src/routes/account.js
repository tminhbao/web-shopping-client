const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/AccountController");
const loginController = require("../app/controllers/LoginController");
router.get("/", loginController.checkLoggedIn, accountController.index);
module.exports = router;
