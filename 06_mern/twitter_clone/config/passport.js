const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const keys = require('./keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secret,
};

async function verify(jwt_payload, done) {
  const user = await User.findById(jwt_payload.id);

  if (!user) {
    return done('Access restricted', null);
  }

  return done(null, user);
}

module.exports = passport.use(new Strategy(options, verify)).initialize();
