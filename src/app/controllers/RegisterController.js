const db = require('../../configs/connect')
//import {validationResult} from 'express-validator';
const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcryptjs');
const registerService = require('../../services/registerService')
class RegisterController {
    index(req, res) {
        res.render('register',{
            errors:req.flash('errors')
        });
    }
    async createNewUser (req,res) {
        // Validate all require fields
        let errorsArr = [];
        let validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            let errors = Object.values(validationErrors.mapped());
            errors.forEach((item)=>{
                errorsArr.push(item.msg);
            })
            req.flash("errors",errorsArr);
            return res.redirect('/register');
        }

        // Create a new user 
        try {
            let newUser = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                mob_no:req.body.mob,
                password: req.body.password
            };
            await registerService.createNewUser(newUser);
            return res.redirect('/login');
        } catch (e) {
            req.flash("errors",e);
            return res.redirect('/register');
        }
    }
}
module.exports = new RegisterController;