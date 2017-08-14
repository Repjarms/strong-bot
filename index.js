'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const fact = require('./lib/fact');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const GROUPME_URL = 'https://api.groupme.com/v3/bots/post';

app.get('/', (req, res) => {
  res.send('Hello strong bot');
});

app.post('/fact', (req, res) => {
  if (req.body.text.includes('*shakes cup*')) {
    fact.list()
      .then((fact) => {
        request.post(GROUPME_URL).form(fact);
        res.send(fact);
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

const PORT = process.env.PORT || 8004;

app.listen(PORT, () => {
  console.log('Strong bot listening on port %s', PORT);
});
