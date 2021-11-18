const express = require('express');
const passport = require('passport');
const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validations/tweet');

const router = express.Router();

router.get('/', (req, res, next) => {
  Tweet.find(req.query)
    .sort({ createdAt: -1 })
    .then((tweets) => res.json(tweets))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json(tweet))
    .catch(next);
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const tweet = new Tweet({
      text: req.body.text,
      user: req.user.id,
    });

    await tweet.save();
    res.json(tweet);
  }
);

module.exports = router;
