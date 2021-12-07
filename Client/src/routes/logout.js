const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');
router.post('/logout',loginController.postLogOut);
module.exports = router;