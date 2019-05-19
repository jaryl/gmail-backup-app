require('dotenv').config();

const express = require('express');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 3000;

const rootRouter = require('./app/root');
const frontendRouter = require('./app/frontend');
const apiRouter = require('./app/api');

app.use('/', rootRouter);
app.use('/app', frontendRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  debug(`listening on port ${port}`);
});
