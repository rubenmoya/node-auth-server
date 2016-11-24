const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, function() {
  console.log('Server listening to port: ' + port);
});
