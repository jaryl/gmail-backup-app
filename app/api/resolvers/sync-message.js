const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const store = require('../store');

const syncMessage = async (parent, args, { db, token }) => {
  const {
    mailboxId,
    receivedAt,
    size,
    providerType,
    labelIds,
    payload,
    snippet,
    gmailPayload,
  } = args;

  const { mailboxIds } = jwt.verify(token, store.JWT_SECRET);
  if (!mailboxIds.includes(mailboxId)) throw new Error('User does not have access to this mailbox'); // TODO: find better way to present error

  if (providerType === 'GMAIL') {
    const labels = await db.Label.findAll({
      where: {
        mailboxId,
        [Op.or]: [
          { providerId: labelIds || [] },
          { type: 'app', providerId: 'ALL' },
        ],
      },
    });

    const [result] = await db.sequelize.transaction(async t => db.Thread.findOrCreate({
      where: { providerId: gmailPayload.threadId, mailboxId },
      defaults: {
        mailboxId,
        providerId: gmailPayload.threadId,
      },
      transaction: t,
    }).then(([thread]) => db.Message.findOrCreate({
      where: { providerId: gmailPayload.id, mailboxId },
      defaults: {
        mailboxId,
        threadId: thread.dataValues.id,
        providerId: gmailPayload.id,
        receivedAt,
        size,
        labelIds: labels.map(label => label.dataValues.id), // a tad unecessary
        payload,
        snippet: snippet || '[EMPTY CONTENT]',
      },
      transaction: t,
    })));

    return result;
  }
};

module.exports = syncMessage;
