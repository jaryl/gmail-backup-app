const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const { MailboxType } = require('./types');

const { Mailbox } = require('../../models/');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    mailboxes: {
      type: GraphQLList(MailboxType),
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const conditions = args.id ? { id: args.id } : {}; // TODO: strong params?
        return Mailbox.findAll({ where: conditions })
          .then(mailboxes => mailboxes)
          .catch(err => err);
      },
    },
  },
});

module.exports = { query: RootQuery };
