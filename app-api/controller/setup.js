/**
 * Created by bahramhajian on 2016-08-25.
 */
var User = require('../model/user'); // get our mongoose model
var express = require('express');
var router = express.Router();

router.get('/setup',  function(req, res) {
  // create a sample user
  var record = new User({
    userName: 'setup',
    password: 'password',
    admin: true
  });

  // save the sample user
  record.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
