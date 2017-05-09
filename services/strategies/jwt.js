import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import C from '../../config';
import User from '../../models/user';

const OPTIONS = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: C.JWT_SECRET,
};

export default new JwtStrategy(OPTIONS, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);

    return done(null, false);
  });
});
