const express = require('express');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  debug(`listening on port ${port}`);
});
