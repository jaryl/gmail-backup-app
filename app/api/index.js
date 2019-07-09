const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
});

const app = express();

server.applyMiddleware({ app, path: '/' });

module.exports = app;
