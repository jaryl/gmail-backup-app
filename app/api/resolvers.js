const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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
    mailbox: (parent, args, context, info) => null,
    mailboxes: (parent, args, context, info) => [],
  },

  Mutation: {
    register: (parent, args, context, info) => {},
    authenticate: (parent, args, context, info) => {},
  },

  // resolvers types

  Mailbox: {
    labels: (parent, args, context, info) => [],
    threads: (parent, args, context, info) => [],
    messages: (parent, args, context, info) => [],
  },

  Message: {
    thread: (parent, args, context, info) => null,
    from: (parent, args, context, info) => null,
    to: (parent, args, context, info) => [],
    cc: (parent, args, context, info) => [],
    bcc: (parent, args, context, info) => [],
  },

  Thread: {
    labels: (parent, args, context, info) => [],
    messages: (parent, args, context, info) => [],
  },
};

module.exports = resolverMap;
