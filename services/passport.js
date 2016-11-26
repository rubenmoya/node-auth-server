import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../config';
import User from '../models/user';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });

    return undefined;
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
