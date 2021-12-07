const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');
const loginController = require('../app/controllers/LoginController');

router.get('/',homeController.index);
module.exports = router;