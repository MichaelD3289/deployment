const express = require('express');
const path = require('path');
const rewardsUsers = require('./db.json');

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

app.post('/api/rewards/users', (req, res) => {
  let {name, birthday, email} = req.body;

  const index = rewardsUsers.findIndex(rUser => rUser.email === email);

  const newUser = {
    name,
    birthday,
    email
  }
  if(index === -1) {
    rewardsUsers.push(newUser);
    rollbar.log('User successfully added to rewards program', {author: 'Michael', type: 'manual entry'})
    res.status(200).send('You have been successfully added');
  } else if (!email.includes('@'))  {
    rollbar.error('Email address is not valid')
    res.status(400).send('User needs to submit a valid email address')
  } else {
    rollbar.critical('User already exists in system')
    res.status(400).send('User already exists in rewards program')
  }
})

app.use(express.static(path.join(__dirname, '../')));
// app.use(rollbar.errorhandler());

const port = process.env.PORT || 4005;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})