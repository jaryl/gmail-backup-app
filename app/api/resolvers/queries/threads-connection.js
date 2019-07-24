const { ApolloError } = require('apollo-server-express');

const MAX_EDGES_PER_QUERY = 25;

// TODO: exclude nodes from before and after cursors
const THREADS_SQL = `
SELECT * FROM (
  SELECT DISTINCT ON ("Message"."threadId") *
  FROM "Messages" AS "Message"
  WHERE :labelId = ANY("Message"."labelIds")
    AND "Message"."receivedAt" >= :afterDate
    AND "Message"."receivedAt" <= :beforeDate
    AND (:afterId IS NULL OR "Message"."id" != :afterId)
    AND (:beforeId IS NULL OR "Message"."id" != :beforeId)
  ORDER BY "Message"."threadId", "Message"."receivedAt" DESC
) AS "Message"
ORDER BY "Message"."receivedAt" DESC
LIMIT :limit;
`;

const PAGINATION_BEFORE_SQL = `
SELECT COUNT(*) FROM (
  SELECT DISTINCT ON ("Message"."threadId") *
  FROM "Messages" AS "Message"
  WHERE :labelId = ANY("Message"."labelIds")
    AND "Message"."receivedAt" <= :receivedAt
    AND "Message"."id" != :messageId
  ORDER BY "Message"."threadId", "Message"."receivedAt" DESC
) AS "Message";
`;

const PAGINATION_AFTER_SQL = `
SELECT COUNT(*) FROM (
  SELECT DISTINCT ON ("Message"."threadId") *
  FROM "Messages" AS "Message"
  WHERE :labelId = ANY("Message"."labelIds")
    AND "Message"."receivedAt" >= :receivedAt
    AND "Message"."id" != :messageId
  ORDER BY "Message"."threadId", "Message"."receivedAt" DESC
) AS "Message";
`;

const encodeCursor = ({ id, date }) => Buffer.from(JSON.stringify({ id, date })).toString('base64');
const decodeCursor = (cursor) => {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64'));
  } catch {
    return { id: null, date: null };
  }
};

const connection = async (parent, { first, after, last, before }, { db }, info) => {
  if (first < 0) throw new ApolloError('Argument first cannot be less than 0', 'INVALID_PAGINATION', { field: ['first'] });
  if (first > MAX_EDGES_PER_QUERY) throw new ApolloError(`Argument first cannot be greater than ${MAX_EDGES_PER_QUERY}`, 'INVALID_PAGINATION', { field: ['first'] });

  if (last < 0) throw new ApolloError('Argument last cannot be less than 0', 'INVALID_PAGINATION', { field: ['last'] });
  if (last > MAX_EDGES_PER_QUERY) throw new ApolloError(`Argument last cannot be greater than ${MAX_EDGES_PER_QUERY}`, 'INVALID_PAGINATION', { field: ['last'] });

  if (first && last) throw new ApolloError('Arguments first and last cannot both be set', 'INVALID_PAGINATION', { field: ['first', 'last'] });

  // TODO: add index for createdAt and id (do this last)

  const afterCursor = decodeCursor(after);
  const beforeCursor = decodeCursor(before);

  const cursorReplacements = {
    afterId: beforeCursor.id,
    afterDate: beforeCursor.date || new Date(0),
    beforeId: afterCursor.id,
    beforeDate: afterCursor.date || new Date(),
  };

  const results = await db.sequelize.query(THREADS_SQL, {
    replacements: {
      ...cursorReplacements,
      labelId: parent.id,
      limit: (first || last || MAX_EDGES_PER_QUERY),
    },
    model: db.Message,
    mapToModel: true,
    nest: true,
    raw: true,
    type: db.sequelize.QueryTypes.SELECT,
  });

  const edges = results.map((message) => {
    const cursor = encodeCursor({ id: message.id, date: message.receivedAt });
    return {
      cursor,
      node: {
        id: message.threadId,
        lastMessageId: message.id,
      },
    };
  });

  const startCursor = edges.length ? encodeCursor({ id: results[0].id, date: results[0].receivedAt }) : null;
  const endCursor = edges.length ? encodeCursor({ id: results[results.length - 1].id, date: results[results.length - 1].receivedAt }) : null;

  const hasNextPage = (async () => {
    if (edges.length === 0) return false;
    const [beforeCount] = await db.sequelize.query(PAGINATION_BEFORE_SQL, {
      replacements: {
        labelId: parent.id,
        receivedAt: results[results.length - 1].receivedAt,
        messageId: results[results.length - 1].id,
      },
      raw: true,
      type: db.sequelize.QueryTypes.SELECT,
    });
    // console.log(beforeCount, `hasNextPage: ${parseInt(beforeCount.count, 10)}`);
    return parseInt(beforeCount.count, 10) > 0;
  })();

  const hasPreviousPage = (async () => {
    if (edges.length === 0) return false;
    const [afterCount] = await db.sequelize.query(PAGINATION_AFTER_SQL, {
      replacements: {
        labelId: parent.id,
        receivedAt: results[0].receivedAt,
        messageId: results[0].id,
      },
      raw: true,
      type: db.sequelize.QueryTypes.SELECT,
    });
    // console.log(afterCount, `hasPreviousPage: ${parseInt(afterCount.count, 10)}`);
    return parseInt(afterCount.count, 10) > 0;
  })();

  return {
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor,
    },
    edges,
  };
};

module.exports = connection;
