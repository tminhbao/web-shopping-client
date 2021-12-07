const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');
const auth = require('../validation/auth')

const initPassportLocal = require('../app/controllers/PassportController');
initPassportLocal();
// Hiển thị trang register
router.get('/', registerController.index);
router.post('/',auth.validateRegister,registerController.createNewUser);

module.exports = router;