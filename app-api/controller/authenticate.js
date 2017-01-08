/**
 * Created by bahramhajian on 2016-08-25.
 */

var authenticate = require('tokens2').authentication.authenticate;
var express = require('express');
var config = require('../config/config');
var UserModel = require('../model/user'); // get our mongoose model

var router = express.Router();

router.post('/', authenticate({
  userModel: UserModel,
  secret: 'superSecret',
  expiresIn: '15m',
  cryptoAlgorithm: 'aes-256-ctr'}));


router.post('/signup',  function(req, res) {
  var record = new UserModel({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
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

module.exports = router;
