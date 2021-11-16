const express = require('express');
const router = express.Router();

const users = require('./api/users');
const tweets = require('./api/tweets');

router.use('/users', users);
router.use('/tweets', tweets);

module.exports = router;
