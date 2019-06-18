const path = require('path');

const express = require('express');

const app = express();

const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

module.exports = app;
