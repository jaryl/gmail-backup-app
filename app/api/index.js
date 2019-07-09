const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers');

const db = require('../../models');
const store = require('./store'); // TODO: remove this fake store, and replace with db

const app = express();

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
    return {
      db,
      store,
      token,
    };
  },
});

server.applyMiddleware({ app, path: '/' });

module.exports = app;
