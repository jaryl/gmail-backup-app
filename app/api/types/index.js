const graphql = require('graphql');
const { Kind } = require('graphql/language');

const _ = require('lodash');

const store = require('../store');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLScalarType,
} = graphql;

const AccessTokenType = new GraphQLObjectType({
  name: 'AccessToken',
  type: 'Query',
  fields: () => ({
    token: { type: GraphQLID },
  }),
});

const MailboxType = new GraphQLObjectType({
  name: 'Mailbox',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    emailAddress: { type: GraphQLString },
    messagesTotal: { type: GraphQLString },
    threadsTotal: { type: GraphQLString },
    labels: {
      type: new GraphQLList(LabelType),
      resolve(parent, args) {
        return _.filter(store.labelData, { mailboxId: parent.id });
      },
    },
    label: {
      type: LabelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(store.labelData, { id });
      },
    },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return _.filter(store.threadData, { mailboxId: parent.id });
      },
    },
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(store.threadData, { id });
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return _.filter(store.messageData, { mailboxId: parent.id });
      },
    },
  }),
});

const LabelType = new GraphQLObjectType({
  name: 'Label',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return _.filter(store.threadData, thread => _.includes(thread.labelIds, parent.id));
      },
    }
  }),
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    snippet: { type: GraphQLString },
    labels: {
      type: new GraphQLList(LabelType),
      resolve(parent, args) {
        // TODO: use real data
        return _.filter(store.labelData, label => _.includes(parent.labelIds, label.id));
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return _.filter(store.messageData, { threadId: parent.id });
      },
    },
  }),
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    threadId: { type: GraphQLID },
    labelIds: { type: GraphQLString },
    snippet: { type: GraphQLString },
    timestamp: { type: DateScalarType },
    from: {
      type: UserType,
      resolve(parent, args) {
        return _.find(store.userData, { email: parent.from });
      },
    },
    to: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(store.userData, user => parent.to.includes(user.email));
      },
    },
    cc: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(store.userData, user => parent.cc.includes(user.email));
      },
    },
    bcc: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(store.userData, user => parent.bcc.includes(user.email));
      },
    },
    thread: {
      type: MessageType,
      resolve(parent, args) {
        return _.find(store.messageData, { id: parent.threadId });
      },
    },
    // TODO: internalDate, payload, sizeEstimate, raw, etc
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  type: 'Query',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    owner: { type: GraphQLBoolean },
  }),
});

const DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) return new Date(ast.value); // ast value is always in string format
    return null;
  },
});

module.exports = {
  AccessTokenType,
  MailboxType,
  LabelType,
  ThreadType,
  MessageType,
  DateScalarType,
};
