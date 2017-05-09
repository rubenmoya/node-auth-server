import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../../models/user';
import C from '../../config';

const OPTIONS = {
  consumerKey: C.TWITTER_CONSUMER_KEY,
  consumerSecret: C.TWITTER_CONSUMER_SECRET,
  callbackURL: C.TWITTER_CALLBACK,
};

export default new TwitterStrategy(OPTIONS, (token, tokenSecret, profile, done) => {
  User.findOne({ twitter_id: profile.id }, (err, user) => { // eslint-disable-line
    if (err) return done(err);
    if (user) return done(null, user);

    const newUser = new User();
    newUser.twitter_id = profile.id;
    newUser.name = profile.username;
    newUser.screen_name = profile.displayName;
    newUser.description = profile._json.description;
    newUser.url = profile._json.url;
    newUser.save((userSaveErr, savedUser) => {
      if (userSaveErr) return done(err);
      return done(null, savedUser);
    });
  });
});
