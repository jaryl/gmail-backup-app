require('dotenv').config();

const express = require('express');
const debug = require('debug')('app');
const logger = require('morgan');
const { Sequelize } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('combined'));

const rootApp = require('./app/root');
const frontendApp = require('./app/frontend');
const apiApp = require('./app/api');

app.use('/', rootApp);
app.use('/app/', frontendApp);
app.use('/api', apiApp);

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 1000,
  },
});

sequelize.authenticate()
  .then(() => { debug('Postgres connection has been established successfully.'); })
  .catch((err) => { debug(`Unable to connect to the postgres: ${err}`); });

app.listen(port, () => {
  debug(`App is listening on port ${port}`);
});
