const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '555db0e7d0ff483ab5f1bea0645e13d9',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

app.use(express.static(path.join(__dirname, '../')))

const port = process.env.PORT || 4005;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})