const express = require('express');
const users = require('./api/users');
const tweets = require('./api/tweets');

const router = express.Router();

router.use('/users', users);
router.use('/tweets', tweets);

module.exports = router;
