const express = require('express')
const passport = require('passport')
const router = express.Router()

const UserDetails = require('../models/User')

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());


router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/admin');
    });

  })(req, res, next);
});

router.get('/login',(req, res) => res.render('login'));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router