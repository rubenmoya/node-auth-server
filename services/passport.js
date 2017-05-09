import passport from 'passport';
import { LocalStrategy, JWTStrategy, TwitterStrategy } from './strategies';
import User from '../models/user';

passport.use(LocalStrategy);
passport.use(JWTStrategy);
passport.use(TwitterStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
