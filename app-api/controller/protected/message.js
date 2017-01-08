/**
 * Created by bahramhajian on 2016-08-27.
 */
var express = require('express');
var router = express.Router();
var Message = require('../../model/message');
var redisMQ = require('../../dao/redis-mq-dao');
var User = require('../../model/user');
var messageWS = require('./message-websocket');
var Group = require('../../model/group');

router.get('/getMessages', function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  var lastReadSeq = req.body.lastReadSeq;
  User.find({ _id: userId }).
  select('messages.sourceUserId messages.toGroup messages.message ' +
    'messages.seqId messages.timestamp messages.deleted messages.read message.' +
    'messages.attachment messages.destinationId').
  exec(function (err, messages) {
    if (err) return handleError(err);
    res.json('message/getMessages', messages);
  });
});

router.post('/create', function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  var destinationId = req.body.destinationId;
  var messageBody = req.body.message;
  var toGroup = req.body.toGroup;
  var message = new Message({
    destinationId: destinationId,
    sourceUserId: userId,
    message: messageBody,
    timestamp: Date.now(),
    toGroup: toGroup,
    read: false,
    deleted: false,
  });

  message.save(function(err) {
    if (err) throw err;
    console.log('message saved successfully');
    if(!toGroup) {
      User.update(
        {_id: destinationId},
        {$push: {'messages': [message]}},
        {safe: true, upsert: true},
        function (err, obj) {
          console.log(err);
          console.log(obj);
        });

      var client = messageWS.clients[destinationId];
      if (client) {
        redisMQ.rsmq.sendMessage({qname: destinationId, message: body},
          function (err, resp) {
            if (resp) {
              console.log("Message sent. ID:", resp);
            }
          });
      }
    } else{
      Group.find({ _id: destinationId }).exec(function (err, groups) {
        if (err) return handleError(err);
        console.log(JSON.stringify(groups));
      });
    }
    console.log(JSON.stringify(message));
    res.json('message/create', {
      success: true,
      id: message._id,
      seq: message.seqId,
      token: req.token});
  });


});

router.post('/deleteMessage', function(req, res) {

});

router.post('/updateMessage', function(req, res) {

});

module.exports = router;
