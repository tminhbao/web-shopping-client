const express = require("express");
const router = express.Router();
const resetPasswordController = require("../app/controllers/ResetPasswordController");
router.get("/", resetPasswordController.index);
router.post("/", resetPasswordController.handleUpdatePassword);
module.exports = router;
