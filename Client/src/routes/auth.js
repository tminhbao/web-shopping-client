const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router();

app.route('/login')
.get((req,res) => res.render('login'))
.post(passport.authenticate('local',{
    failureRedirect:'/login',
    successRedirect:'/'
}))

router.get('/private',(req,res) => {
  if(req.isAuthenticated()) {
    res.send('Welcome to private page')
  }
  else 
  {
    res.send('Ban chưa login')
  }
})