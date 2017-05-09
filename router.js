import passport from 'passport';
import * as Authentication from './controllers/authentication';
import passportService from './services/passport'; // eslint-disable-line no-unused-vars

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', (req, res) => {
    res.send(`<pre>${JSON.stringify(req.user)}</pre>`);
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/something' }));

  app.get('/something', (req, res) => {
    res.send('<a href="/auth/twitter">Sign in with Twitter</a>');
  });
};

export default router;
