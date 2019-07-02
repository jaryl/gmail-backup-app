const express = require('express');
const passport = require('passport');

const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');

const { query, mutation } = require('./queries');

const { GraphQLSchema } = graphql;
const schema = new GraphQLSchema({ query, mutation });

// TODO: enforce JWT authentication on all routes

const app = express();
const passportConfig = require('./passport');

app.use(passport.initialize());

passportConfig.setup();

app.use('/', graphqlHTTP({
  schema,
  graphiql: (process.env.API_ENABLE_GRAPHQL === 'true' || false),
}));

module.exports = app;
