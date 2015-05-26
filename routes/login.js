/**
 * Created by adityamangipudi1 on 5/15/15.
 */
var express = require('express');
var config = require('../config.json');
var passport = require('passport');
var session = require('express-session');
var logout = require('express-passport-logout');
var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}
var cookie_secret=uuid();
router.use(session({  secret: cookie_secret,
    name: 'shark-id',
    proxy: true,
    resave: true,
    saveUninitialized: true }));
var profileG;
var LINKEDIN_KEY =config.api_key;
var LINKEDIN_SECRET = config.secret_key;

passport.serializeUser(function(user, done) {
    //console.log('user', user);
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});


passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile']
}, function( accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.

        console.log(profile);
        profileG=profile;
        return done(null, profile);
    });
}));


/* GET home page. */
router.get('/linkedin', passport.authenticate('linkedin', { state: '7e12584c96664ddbb15c847450bba436'  }),function(req, res, next) {

});

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/auth/authenticated',
        failureRedirect: '/'
}));

router.get('/authenticated', function(req, res){
    //console.log('req.user', req.session.user);
    console.log('req-user', req.session);
    res.render('authenticated', {user:profileG.displayName, profile: profileG.photos[0], key: config.api_key});
});

//gets profile to send to user
router.get('/profile', function(req, res){
    res.send(profileG['_json']);
});

//edits and makes changes to user, maybe put?
router.post('/profile', function(req, res){
    console.log(req.body); //profile obj
    res.send({message:'Mission accomplished.'})
});

router.get('/logout', function(req, res){
        console.log('logging out', req.session);
        req.logout();
        req.session.destroy();
        console.log('after logout', req.session);
        profileG = null;
        res.redirect('/');
});

module.exports = router;
