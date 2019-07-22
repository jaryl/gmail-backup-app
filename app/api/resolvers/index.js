const { ApolloError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

const store = require('../store');

const register = require('./register');
const authenticate = require('./authenticate');
const syncMessage = require('./sync-message');

const resolverMap = {
  // custom scalar types

  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Custom scalar type for date time',
    parseValue: value => new Date(value),
    serialize: value => value.getTime(),
    parseLiteral: (ast) => {
      // ast value is always in string format
      if (ast.kind === Kind.INT) return new Date(ast.value);
      return null;
    },
  }),

  // resolvers for root queries

  Query: {
    mailbox: (parent, args, { db, token }) => {
      const { accountId } = jwt.verify(token, store.JWT_SECRET);
      return db.Mailbox.findOne({ where: { id: args.id, accountId } });
    },
    mailboxes: (parent, args, { db, token }) => {
      const { accountId } = jwt.verify(token, store.JWT_SECRET);
      return db.Mailbox.findAll({ where: { accountId } });
    },
  },

  // resolvers for mutations

  Mutation: {
    register,
    authenticate,
    syncMessage,
  },

  // resolvers types

  Label: {
    threads: (parent, args, { db }, info) => {
      return db.Thread.findAll({
        where: { labelIds: { [Op.contains]: [parent.dataValues.id] } },
        order: [['lastMessageReceivedAt', 'DESC']],
      });
    },
    slug: parent => parent.name.replace(/\s+/g, '-').toLowerCase(),
  },

  Mailbox: {
    labels: (parent, args, context, info) => parent.getLabels(),
    label: async (parent, args, context, info) => {
      const labels = await parent.getLabels({ where: { id: args.id } });
      return labels[0];
    },
    threads: (parent, args, context, info) => parent.getThreads({
      order: [['lastMessageReceivedAt', 'DESC']],
    }),
    thread: (parent, args, { db }, info) => db.Thread.findOne({ where: { mailboxId: parent.id, id: args.id } }),
    messages: (parent, args, context, info) => parent.getMessages(),
  },

  Message: {
    thread: (parent, args, context, info) => parent.getThread(),
  },

  Thread: {
    labels: (parent, args, { db }, info) => db.Label.findAll({ where: { id: { [Op.in]: parent.dataValues.labelIds } } }),
    messages: async (parent, args, context, info) => parent.getMessages({
      order: [['receivedAt', 'DESC']]
    }),
    lastMessage: async (parent, args, { db, loaders }, info) => {
      return loaders.lastMessagesByThreadIds.load(parent.id);
    },
  },
};

module.exports = resolverMap;
