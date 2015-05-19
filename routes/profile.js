/**
 * Created by Chris on 5/19/2015.
 */

var express = require('express');
var router = express.Router();

//gets profile to send to user
router.get('/getProfile', function(req, res){
    res.send(profileG['_json']);
});

//edits and makes changes to user, maybe put?
router.post('/profile', function(req, res){
    console.log(req.body);
    res.send({message:'Mission accomplished.'})
});

module.exports = router;
