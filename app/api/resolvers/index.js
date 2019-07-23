const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

const store = require('../store');

const register = require('./register');
const authenticate = require('./authenticate');
const syncMessage = require('./sync-message');

const CONVERSATIONS_SQL = `
SELECT * FROM "Threads" AS "Thread"
JOIN (
  SELECT "Message"."threadId", MAX("Message"."receivedAt") AS "receivedAt"
  FROM "Messages" AS "Message"
  WHERE :labelId = ANY("Message"."labelIds")
    AND "Message"."receivedAt" > :after
    AND "Message"."receivedAt" < :before
  GROUP BY "Message"."threadId"
) "Message"
ON "Thread"."id" = "Message"."threadId"
ORDER BY "Message"."receivedAt" DESC;
`;

const THREAD_LABELS_SQL = `
SELECT * FROM "Labels" AS "Label"
JOIN (
  SELECT ARRAY_AGG("Message"."labelIds") AS "labelIds"
  FROM (SELECT "threadId", UNNEST("labelIds") AS "labelIds" FROM "Messages") "Message"
  WHERE "Message"."threadId" = :threadId
) "Messages"
ON "Label"."id" = ANY("Messages"."labelIds");
`;

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
    threads: (parent, { after, before }, { db }, info) => {
      return db.sequelize.query(CONVERSATIONS_SQL, {
        replacements: {
          labelId: parent.id,
          after: after || new Date(0),
          // after: after || new Date(2019, 1), // keep around for testing
          before: before || new Date(),
        },
        model: db.Thread,
        mapToModel: true,
        nest: true,
        raw: true,
        type: db.sequelize.QueryTypes.SELECT,
      });
    },
    messages: (parent, args, { db }, info) => {
      return db.Message.findAll({
        where: { labelIds: { [Op.contains]: [parent.dataValues.id] } },
        order: [['receivedAt', 'DESC']],
        having: {},
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
    threads: (parent, args, context, info) => parent.getThreads(),
    thread: (parent, args, { db }, info) => db.Thread.findOne({ where: { mailboxId: parent.id, id: args.id } }),
    messages: (parent, args, context, info) => parent.getMessages(),
  },

  Message: {
    thread: (parent, args, context, info) => parent.getThread(),
    labels: (parent, args, { db }, info) => db.Label.findAll({ where: { id: { [Op.in]: parent.dataValues.labelIds } } }),
  },

  Thread: {
    labels: (parent, args, { db }, info) => {
      return db.sequelize.query(THREAD_LABELS_SQL, {
        replacements: { threadId: parent.id },
        model: db.Label,
        mapToModel: true,
        nest: true,
        raw: true,
        type: db.sequelize.QueryTypes.SELECT,
      });
    },
    messages: async (parent, args, context, info) => parent.getMessages({
      order: [['receivedAt', 'DESC']]
    }),
    lastMessage: async (parent, args, { db, loaders }, info) => {
      return loaders.lastMessagesByThreadIds.load(parent.id);
    },
  },
};

module.exports = resolverMap;
