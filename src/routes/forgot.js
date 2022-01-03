const express = require("express");
const router = express.Router();
const forgotController = require("../app/controllers/ForgotController");
router.get("/", forgotController.index);
router.post("/", forgotController.handleForgotPassword);
module.exports = router;
