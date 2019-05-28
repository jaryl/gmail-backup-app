const express = require('express');
const passport = require('passport');

const graphqlHTTP = require('express-graphql');

const { schema, root } = require('./schemas');

// TODO: enforce JWT authentication on all routes

const app = express();
const passportConfig = require('./passport');

app.use(passport.initialize());

passportConfig.setup();

app.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true, // TODO: toggle based on environment
}));

module.exports = app;
