const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(403).json({
      email: 'A user has already been registered with this email address',
    });
  }

  const user = new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  });

  await user.save();
  res.json({ token: generateToken(user) });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      email: 'There is no registered user with this email address',
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ password: 'Incorrect password' });
  }

  res.json({ token: generateToken(user) });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);

function generateToken(user) {
  const payload = {
    id: user.id,
    handle: user.handle,
  };

  return jwt.sign(payload, keys.secret, { expiresIn: 3600 });
}

module.exports = router;
