const express = require("express");
const router = express.Router();
const shoppingCartController = require("../app/controllers/ShoppingCartController");
const loginController = require("../app/controllers/LoginController");
router.get("/", loginController.checkLoggedIn, shoppingCartController.index);
//router.get("/product", shoppingCartController.getProduct);
module.exports = router;
