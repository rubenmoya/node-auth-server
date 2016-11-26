import jwt from 'jwt-simple';
import User from '../models/user';
import config from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

export const signin = (req, res) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.' });
  }

  return User.findOne({ email }, (err, user) => {
    if (err) return next(err);

    if (user) {
      return res.status(422).send({ error: 'Email already taken.' });
    }

    const newUser = new User({ email, password });

    return newUser.save((error) => {
      if (error) return next(error);
      return res.status(201).send({ token: tokenForUser(newUser) });
    });
  });
};
