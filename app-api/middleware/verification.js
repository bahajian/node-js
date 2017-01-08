/**
 * Created by bahramhajian on 2016-08-17.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require('../model/user');
var cryto = require('../helper/cryptography');

exports.verify = function(req, res, next) {
  res = res || {};
  var token = req.body.token || req.query.token
    || req.headers['x-token'];
  var accessToken = req.body.accessToken || req.query.accessToken
    || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        if (accessToken) {
          var decrypteedAccessToken = cryto.decrypt(accessToken,
            config.cryptoAlgorithm, config.secret);
          var userId = JSON.parse(decrypteedAccessToken).userId;
          User.findOne({
            _id: userId,
          }, function(err, user) {
            if(user && user.accessToken === accessToken){
              var token = jwt.sign({sub: 'users/' + user._id}, config.secret,
                {
                  expiresIn: '120d',
                });
              req.token = token;
              req.decoded = {sub: 'users/' + user._id};
              req.id = user._id;
              next();
            } else{
              return res.json({
                success: false,
                message: 'Failed to authenticate token.',
              });
            }
          });
        } else {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.',
          });
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}
