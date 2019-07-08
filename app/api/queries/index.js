const _ = require('lodash');

const jwt = require('jsonwebtoken');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const store = require('../store');
const { MailboxType } = require('../types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    mailboxes: {
      type: new GraphQLList(MailboxType),
      args: { token: { type: GraphQLID } },
      resolve(parent, args, ctx) {
        const headerToken = ctx.headers.authorization ? ctx.headers.authorization.split(' ')[1] : undefined;
        const token = headerToken || args.token;
        const { userId } = jwt.verify(token, store.JWT_SECRET);
        return _.filter(store.mailboxData, { userId });
      },
    },
    mailbox: {
      type: MailboxType,
      args: {
        id: { type: GraphQLID },
        token: { type: GraphQLID },
      },
      resolve(parent, args, ctx) {
        const headerToken = ctx.headers.authorization ? ctx.headers.authorization.split(' ')[1] : undefined;
        const token = headerToken || args.token;
        const { userId } = jwt.verify(token, store.JWT_SECRET);
        if (args.id) return _.find(store.mailboxData, { id: args.id, userId });
        return store.mailboxData[0];
      },
    },
  },
});

module.exports = { RootQuery };
