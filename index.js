import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from './router';

const app = express();

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json({ type: '*/*' }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
