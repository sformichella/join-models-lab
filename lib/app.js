const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const { body } = req;

  res.send(body);
});

module.exports = app;
