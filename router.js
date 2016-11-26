import * as Authentication from './controllers/authentication';
import passportService from './services/passport'; // eslint-disable-line no-unused-vars
import passport from 'passport'; // eslint-disable-line import/first

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};

export default router;
