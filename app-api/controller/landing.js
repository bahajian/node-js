/**
 * Created by bahramhajian on 2016-06-16.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'message': 'you have landed here.'});
});

module.exports = router;
