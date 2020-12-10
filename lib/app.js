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

app.post('/videos', (req, res) => {
  const video = req.body;

  Video
    .make(video)
    .then(response => res.send(response))
    .catch(err => res.send(err.message));
});

app.get('/youtubers/:id', (req, res) => { 
  const id = req.params.id;

  Youtuber
    .getById(id)
    .then(response => res.send(response))
    .catch(err => err.message);
});

app.get('/videos/:id', (req, res) => {
  const id = req.params.id;

  Video
    .getById(id)
    .then(response => res.send(response))
    .catch(err => err.message);
});

app.get('/youtubers', (req, res) => {
  Youtuber
    .getAll()
    .then(response => res.send(response))
    .catch(err => err.message);
});

module.exports = app;
