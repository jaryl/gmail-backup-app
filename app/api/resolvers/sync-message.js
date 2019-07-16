const jwt = require('jsonwebtoken');

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
    const labels = await db.Label.findAll({ where: { providerId: labelIds } });
    const allLabel = await db.Label.findAll({ where: { type: 'app', providerId: 'ALL' } });

    const [message] = await db.sequelize.transaction(t => db.Thread.findOrCreate({
      where: { providerId: gmailPayload.threadId, mailboxId },
      defaults: {
        mailboxId,
        providerId: gmailPayload.threadId,
        labelIds: (labels.concat(allLabel)).map(label => label.dataValues.id), // a tad unecessary
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
        payload,
        snippet: snippet || '[EMPTY CONTENT]',
      },
      transaction: t,
    })));

    return message;
  }
};

module.exports = syncMessage;
