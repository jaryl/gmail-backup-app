require('dotenv').config();

const express = require('express');
const debug = require('debug')('app');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('combined'));

const rootApp = require('./app/root');
const frontendApp = require('./app/frontend');
const apiApp = require('./app/api');

app.use('/', rootApp);
app.use('/app', frontendApp);
app.use('/api', apiApp);

app.listen(port, () => {
  debug(`listening on port ${port}`);
});
