var express = require('express');
var config = require('../config.json');

var router = express.Router();



var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

function middleware(req, res, next){
  passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(config)
  res.render('index', { title: 'OAuth' });
});

module.exports = router;
