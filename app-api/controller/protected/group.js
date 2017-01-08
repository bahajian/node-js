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
  Group.update(
    {_id: req.body.groupId},
    {$push: {'members': [req.body.memberId]}},
    {safe: true, upsert: true},
    function (err, obj) {
      console.log(err);
      console.log(obj);
    });
  res.json('group/addMember', {success: true});
  // add the group to the list of groups that the member is included.
});

router.post('/removeMember', function(req, res) {
  Group.update(
    { _id: req.body.groupId },
    { $pull: { 'members': req.body.memberId } }
  );
  res.json('group/getMembers', {success: true});
});

router.post('/getMembers', function(req, res) {
  Group.find({ _id: req.body.groupId })
    .select('groupName members')
    .exec(function (err, groups) {
      if (err) return handleError(err);
      res.json('group/removeMember', groups);
    });
});

router.post('/getGroups', function(req, res) {
  Group.find({  })
    .exec(function (err, groups) {
      if (err) return handleError(err);
      res.json('group/getGroups', groups);
    });
});

module.exports = router;
