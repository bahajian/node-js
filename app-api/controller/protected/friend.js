/**
 * Created by bahramhajian on 2016-08-27.
 */
var express = require('express');
var router = express.Router();
var Group = require('../../model/group');

router.post('/create', function(req, res) {
  var userId = req.decoded.sub.substring(6, req.decoded.sub.length);
  var group = new Group({
    groupName: req.body.groupName,
    creatorId: userId,
    members: [userId],
    isActive: true,
  });

  group.save(function(err) {
    if (err) throw err;

    console.log('group saved successfully');
    res.json('group/create', {success: true, id: this._id, token: req.token});
  });

});

router.post('/addMember', function(req, res) {
  Group.findOne({
    _id: req.body.id
  }, function(err, group) {
    group.members.push(req.body.newMember);
    group.save();
  });
});

router.post('/removeMember', function(req, res) {

});

module.exports = router;
