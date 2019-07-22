const DataLoader = require('dataloader');
const _ = require('lodash');

const db = require('../../../models');

const LAST_MESSAGES_BY_THREAD_IDS_SQL = `
  SELECT
    "Thread"."id", "Messages"."id" AS "lastMessage.id", "Messages"."mailboxId" AS "lastMessage.mailboxId", "Messages"."threadId" AS "lastMessage.threadId", "Messages"."providerId" AS "lastMessage.providerId", "Messages"."snippet" AS "lastMessage.snippet", "Messages"."receivedAt" AS "lastMessage.receivedAt", "Messages"."payload" AS "lastMessage.payload", "Messages"."size" AS "lastMessage.size", "Messages"."createdAt" AS "lastMessage.createdAt", "Messages"."updatedAt" AS "lastMessage.updatedAt"
  FROM "Threads" AS "Thread"
  LEFT JOIN "Messages" AS "Messages" ON "Messages"."id" = (
    SELECT "id" from "Messages" AS "Messages"
    WHERE "Messages"."threadId" = "Thread"."id"
    ORDER BY "Messages"."receivedAt" DESC
    LIMIT 1
  )
  WHERE "Thread"."id" IN (:ids);
`;

const orderedFor = (rows, collection, field, node) => {
  const inGroupsOffField = _.groupBy(rows, row => row[field]);
  return collection.map((element) => {
    const elementArray = inGroupsOffField[element];
    if (elementArray) return node ? elementArray[0][node] : elementArray[0];
    return {};
  });
};

const loaders = {
  lastMessagesByThreadIds: new DataLoader(async (ids) => {
    const results = await db.sequelize.query(LAST_MESSAGES_BY_THREAD_IDS_SQL, {
      replacements: { ids },
      model: db.Thread,
      mapToModel: true,
      nest: true,
      raw: true,
      type: db.sequelize.QueryTypes.SELECT,
    });

    const dataLoaded = orderedFor(results, ids, 'id', 'lastMessage');
    return dataLoaded;
  }),
  // messagesByIds: new DataLoader(async (ids) => {
  //   const results = db.Message.findAll({ where: { id: { [Op.in]: ids } } });
  //   return orderedFor(results, ids, 'id');
  // }),
};

module.exports = loaders;
