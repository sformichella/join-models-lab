require('dotenv').config();
const app = require('./lib/app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Started on ${port}.`);
});

