const _ = require('lodash');

const jwt = require('jsonwebtoken');

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

const userCredentials = [
  { mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', username: 'john.doe', password: '123123123' },
  { mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', username: 'jane.doe', password: '123123123' },
];

const JWT_SECRET = 'some random secret'; // TODO: replace with key from ENV

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    mailbox: {
      type: MailboxType,
      args: { token: { type: GraphQLID } },
      resolve(parentValue, args, ctx) {
        const headerToken = ctx.headers.authorization.split(' ')[1];
        const token = headerToken || args.token;
        const { mailboxId } = jwt.verify(token, JWT_SECRET, (error, decoded) => {
          if (error) throw error;
          return decoded;
        });
        return _.find(mailboxData, { id: mailboxId });
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
        const credentials = _.find(userCredentials, { username, password });
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
          mailboxId: credentials.mailboxId,
        }, JWT_SECRET);
        return { token };
      },
    },
  },
});

module.exports = {
  query: RootQuery,
  mutation: Mutation,
};
