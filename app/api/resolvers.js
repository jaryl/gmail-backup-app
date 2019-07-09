const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const store = require('./store');

const generateAccessToken = userId => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
  userId,
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
      const { userId } = jwt.verify(token || args.token, store.JWT_SECRET);
      if (args.id) return db.mailbox.find({ id: args.id, userId });
      return db.mailbox.findOne({ userId });
    },
    mailboxes: (parent, args, { db, token }) => {
      const { userId } = jwt.verify(token || args.token, store.JWT_SECRET);
      return db.mailbox.findAll({ where: { userId } });
    },
  },

  Mutation: {
    register: (parent, args, context, info) => {
      if (_.find(store.userCredentials, { username: args.username })) throw new Error('This username is already taken.');

      const newUser = {
        id: uuidv4(),
        username: args.username,
        password: args.password,
      };
      store.userCredentials.push(newUser);

      const newMailbox = {
        id: uuidv4(),
        userId: newUser.id,
        emailAddress: args.emailAddress,
        messagesTotal: 0,
        threadsTotal: 0,
      };
      store.mailboxData.push(newMailbox);

      const token = generateAccessToken(newUser.id);
      return { token };
    },
    authenticate: (parent, { username, password }, context, info) => {
      console.log(username, password);
      const credentials = _.find(store.userCredentials, { username, password });
      const token = generateAccessToken(credentials.id);
      return { token };
    },
  },

  // resolvers types
  Label: {
    threads: (parent, args, context, info) => _.filter(store.threadData, thread => _.includes(thread.labelIds, parent.id)),
  },

  Mailbox: {
    labels: (parent, args, context, info) => _.filter(store.labelData, { mailboxId: parent.id }),
    label: (parent, args, context, info) => _.find(store.labelData, { mailboxId: parent.id, id: args.id }),
    threads: (parent, args, context, info) => _.filter(store.threadData, { mailboxId: parent.id }),
    thread: (parent, args, context, info) => _.find(store.threadData, { mailboxId: parent.id, id: args.id }),
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
    labels: (parent, args, context, info) => _.filter(store.labelData, label => _.includes(parent.labelIds, label.id)),
    messages: (parent, args, context, info) => _.filter(store.messageData, { threadId: parent.id }),
  },
};

module.exports = resolverMap;
