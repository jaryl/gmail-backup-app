const express = require('express');

const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');

const { query, mutation } = require('./queries');

const { GraphQLSchema } = graphql;
const schema = new GraphQLSchema({ query, mutation });

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: (process.env.API_ENABLE_GRAPHQL === 'true' || false),
}));

module.exports = app;
