const express = require('express');

const app = express();

const router = require('./routes');

// TODO: serve entire Vue.js app (no auth needed)

app.use('/', router);

module.exports = app;
