const express = require('express');
const app = express();
app.use(express.json());

const Youtuber = require('../lib/models/youtuber');
const Video = require('../lib/models/video');

app.post('/youtubers', (req, res) => {
  const youtuber = req.body;

  Youtuber
    .make(youtuber)
    .then(response => res.send(response))
    .catch(err => res.send(err.message));
});

module.exports = app;
