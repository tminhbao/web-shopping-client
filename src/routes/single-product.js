const express = require("express");
const router = express.Router();
const singleProductController = require("../app/controllers/SingleProductController");
router.get("/", singleProductController.index);
module.exports = router;
