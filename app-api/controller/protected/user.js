
var express = require('express');
var router = express.Router();
var User = require('../../model/user'); // get our mongoose model
var config = require('../../config/config'); // get our config file

router.post('/create',  function(req, res) {
  var record = new User({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    fistName: req.body.fistName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    isAdmin: false,
    isOrgUser: false,
    isActive: true,
    emailVerified: false,
    phoneVerified: false,
  });

  // save the sample user
  record.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.post('/update',  function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  User.findOneAndUpdate({_id: userId}, {$set:
  {
    userName: req.body.userName,
    password: req.body.password,
    fistName: req.body.fistName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    dateOfBirth: req.body.dateOfBirth,
  }}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data!");
    }
    console.log(doc);
  });
});

router.post('/updateEmail',  function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  User.findOneAndUpdate({_id: userId}, {$set:
  {
    email: req.body.email,
    emailVerified: false,
  }}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data!");
    }
    console.log(doc);
  });
});

router.post('/updatePhoneNumber',  function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  User.findOneAndUpdate({_id: userId}, {$set:
  {
    phoneNumber: req.body.phoneNumber,
    phoneVerified: false,
  }}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data!");
    }
    console.log(doc);
  });
});

router.post('/deactivate',  function(req, res) {
  // create a user
});

router.post('/activate',  function(req, res) {
  // create a user
});

router.post('/verifyEmail',  function(req, res) {
  // verify a user
});

router.post('/verifyPhoneNumber',  function(req, res) {
  // verify a user
});

router.post('/sendVerificationEmail',  function(req, res) {
  // verify a user
});

router.post('/sendSMSVerificationCode',  function(req, res) {
  // verify a user
});

router.post('/addFriend',  function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  User.findOneAndUpdate({_id: userId},
    {$push:{friends: [req.body.friendId]}},
    {safe: true, upsert: true},
    function(err, doc){
      if(err){
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    });
});

router.post('/removeFriend',  function(req, res) {
  // remove a user
});

router.post('/crossReferenceFriendList',  function(req, res) {
  // generate friend list
});

router.post('/getFriendList',  function(req, res) {
  // get a list of friends
});

router.get('/profile', function(req, res){
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  User.find({_id: userId}, function(err, users) {
    res.json({users: users, decoded: req.decoded});
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json({users: users, decoded: req.decoded});
  });
});

module.exports = router;
