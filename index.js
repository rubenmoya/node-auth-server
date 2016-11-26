import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';

const app = express();

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
