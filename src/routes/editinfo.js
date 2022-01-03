const express = require("express");
const router = express.Router();
const editInfoController = require("../app/controllers/EditInfoController");
const loginController = require("../app/controllers/LoginController");
router.get("/", loginController.checkLoggedIn, editInfoController.index);
router.post("/", editInfoController.changeInfo);
module.exports = router;
