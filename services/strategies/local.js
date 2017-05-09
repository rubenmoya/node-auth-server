import LocalStrategy from 'passport-local';
import User from '../../models/user';

const OPTIONS = { usernameField: 'email' };

export default new LocalStrategy(OPTIONS, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (error, isMatch) => {
      if (error) return done(error);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });

    return undefined;
  });
});
