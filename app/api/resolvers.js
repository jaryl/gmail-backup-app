const { ApolloError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const store = require('./store');

const generateAccessToken = accountId => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
  accountId,
}, store.JWT_SECRET);

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
      const { accountId } = jwt.verify(token || args.token, store.JWT_SECRET);
      if (args.id) return db.Mailbox.findOne({ where: { id: args.id, accountId } });
      return db.Mailbox.findOne({ where: { accountId } });
    },
    mailboxes: (parent, args, { db, token }) => {
      const { accountId } = jwt.verify(token || args.token, store.JWT_SECRET);
      return db.mailbox.findAll({ where: { accountId } });
    },
  },

  Mutation: {
    register: async (parent, args, { db }) => {
      const {
        username,
        password,
        name,
        email,
        providerType,
        providerId,
        labels,
      } = args;

      const existingAccount = await db.Account.findOne({ where: { username } });
      if (existingAccount) throw new ApolloError('This username is already taken.', 'DUPLICATE_KEY', { field: 'username' });

      const account = await db.Account.create({
        username,
        password,
        Mailboxes: [{
          name,
          email,
          providerType,
          providerId,
          Labels: [
            { providerId: 'ALL', name: 'All', type: 'app' },
            ...labels,
          ],
        }],
      }, {
        include: [{
          association: db.Account.associations.Mailboxes,
          include: [db.Mailbox.associations.Labels],
        }],
      });

      const token = generateAccessToken(account.id);
      return { token };
    },

    authenticate: async (parent, { username, password }, { db }) => {
      const account = await db.Account.findOne({ where: { username, password } }); // TODO; password should be encrypted/salted
      if (!account) throw new ApolloError('Failed to authenticate', 'AUTH_FAILED', { field: ['username', 'password'] });
      const token = generateAccessToken(account.id);
      return { token };
    },

    syncMessage: async (parent, { mailboxId, threadId, providerId, receivedAt, snippet, size }, { db, token }) => {
      const { accountId } = jwt.verify(token, store.JWT_SECRET);
      const mailbox = await db.Mailbox.findOne({ where: { id: mailboxId, accountId } });
      const thread = await db.Thread.findOne({ where: { id: threadId, mailboxId } });
      return db.Message.create({
        mailboxId: mailbox.id,
        threadId: thread.id,
        providerId,
        receivedAt,
        snippet,
        size,
      });
    },
  },

  // resolvers types

  Label: {
    threads: (parent, args, { db }, info) => [],
    slug: parent => parent.name.toLowerCase(),
  },

  Mailbox: {
    labels: (parent, args, context, info) => parent.getLabels(),
    label: async (parent, args, context, info) => {
      const labels = await parent.getLabels({ where: { id: args.id } });
      return labels[0];
    },
    threads: (parent, args, context, info) => [],
    thread: (parent, args, context, info) => [],
    messages: (parent, args, context, info) => _.filter(store.messageData, { mailboxId: parent.id }),
  },

  Message: {
    thread: (parent, args, context, info) => _.find(store.messageData, { id: parent.threadId }),
    from: (parent, args, context, info) => _.find(store.userData, { email: parent.from }),
    to: (parent, args, context, info) => _.filter(store.userData, user => parent.to.includes(user.email)),
    cc: (parent, args, context, info) => _.filter(store.userData, user => parent.cc.includes(user.email)),
    bcc: (parent, args, context, info) => _.filter(store.userData, user => parent.bcc.includes(user.email)),
  },

  Thread: {
    labels: (parent, args, context, info) => [],
    messages: (parent, args, context, info) => _.filter(store.messageData, { threadId: parent.id }),
  },
};

module.exports = resolverMap;
