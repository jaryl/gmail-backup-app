const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const MailboxType = new GraphQLObjectType({
  name: 'Mailbox',
  type: 'Query',
  fields: {
    id: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    messagesTotal: { type: GraphQLString },
    threadsTotal: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});


module.exports = { MailboxType };
