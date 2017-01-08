/**
 * Created by bahramhajian on 2016-06-16.
 */

'use strict';

var express = require('express');
var router = express.Router();
var verify = require('../middleware/verification').verify;

router.use('/authenticate', require('./authenticate'));
router.use('/landing', require('./landing'));
router.use('/setup', require('./setup'));

// router.use(verify);

router.use('/message', require('./protected/message'));
router.use('/friend', require('./protected/friend'));
router.use('/user', require('./protected/user'));
router.use('/group', require('./protected/group'));

module.exports = router;
