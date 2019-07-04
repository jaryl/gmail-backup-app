const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const {
  AccessTokenType,
  MailboxType,
} = require('./types');

// const { Mailbox } = require('../../models/');

const mailboxData = [
  { id: '80a9521e-c07a-4b21-aca3-66eea0fefe13', emailAddress: 'john.doe@example.net', messagesTotal: 1000, threadsTotal: 800 },
  { id: 'd71590d1-784c-4b5b-84cd-f548adb4c723', emailAddress: 'jane.doe@example.net', messagesTotal: 1000, threadsTotal: 800 },
];

const accessTokenData = [
  { token: 'e953183d-7e9f-4a75-b5e1-5f7ff8ee6cd7', mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', username: 'john.doe', password: '123123123' },
  { token: 'bc60a212-7eca-47a9-8e11-f70f295e4e43', mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', username: 'jane.doe', password: '123123123' },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    mailbox: {
      type: MailboxType,
      args: { token: { type: GraphQLID } },
      resolve(parentValue, { token }) {
        // TODO: return real data
        const accessToken = _.find(accessTokenData, { token });
        return _.find(mailboxData, { id: accessToken.mailboxId });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    authenticate: {
      type: AccessTokenType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parents, { username, password }) {
        // TODO: return real data
        return _.find(accessTokenData, { username, password });
      },
    },
  },
});

module.exports = {
  query: RootQuery,
  mutation: Mutation,
};
