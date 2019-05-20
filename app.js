require('dotenv').config();

const express = require('express');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', [path.join(__dirname, '/app/root/views')]);
app.set('view engine', 'ejs');

const rootRouter = require('./app/root')(app);
const frontendRouter = require('./app/frontend')(app);
const apiRouter = require('./app/api')(app);

app.use('/', rootRouter);
app.use('/app', frontendRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  debug(`listening on port ${port}`);
});
