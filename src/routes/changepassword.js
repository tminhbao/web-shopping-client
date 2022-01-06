const express = require("express");
const router = express.Router();
const changePasswordControlller = require("../app/controllers/ChangePasswordController");
const loginController = require("../app/controllers/LoginController");
router.get("/", loginController.checkLoggedIn, changePasswordControlller.index);
router.post("/", changePasswordControlller.handleChangePassword);
module.exports = router;
