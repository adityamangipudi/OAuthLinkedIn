var express = require('express');
var config = require('../config.json');
var passport = require('passport');

var router = express.Router();

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const base_url = 'https://www.linkedin.com/uas/oauth2/authorization';

function middleware(req, res, next){
    console.log('even more gucci');
    passport.use('linkedin', new LinkedInStrategy({
        response_type: "code",
        clientID: config.api_key,
        clientSecret: config.secret_key,
        callbackURL: "http://localhost:3000/auth/linkedin/callback",
        redirect_uri: "https://www.linkedin.com/uas/oauth2/authorization",
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true
    },function(token, refreshToken, profile, done) {
        console.log(profile);
    }));

    next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(config)
    res.render('index', { title: 'OAuth' });
});

router.post('/', middleware, function(req, res){
    console.log('posted');
    //passport.authenticate('linkedin');
    console.log(passport);
    res.render('index');
});

router.get('/auth/linkedin', function(req, res){
    console.log('test');
    passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_basicprofile'],state: 'DCEEFWF45453sdffef424' });
    //passport.authenticate('linkedin', {response_type: 'code'})
    res.render('index', {title: 'ignore'});
});


module.exports = router;
