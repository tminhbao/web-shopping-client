const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

const passport = require('passport');
const initPassportLocal = require('../app/controllers/PassportController');

initPassportLocal();

router.get('/',loginController.checkLoggedOut,loginController.index);
router.post('/',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    successFlash:true,
    failureFlash:true
}))

module.exports = router;


