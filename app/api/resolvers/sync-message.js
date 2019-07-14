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
    gmailPayload,
  } = args;

  const { accountId } = jwt.verify(token, store.JWT_SECRET);
  const mailbox = await db.Mailbox.findOne({ where: { id: mailboxId, accountId } });

  if (providerType === 'GMAIL') {
    const labels = await db.Label.findAll({ where: { providerId: labelIds } });
    const allLabel = await db.Label.findAll({ where: { type: 'app', providerId: 'ALL' } });

    const [message] = await db.sequelize.transaction(t => db.Thread.findOrCreate({
      where: { providerId: gmailPayload.threadId, mailboxId },
      defaults: {
        mailboxId: mailbox.dataValues.id,
        providerId: gmailPayload.threadId,
        labelIds: (labels.concat(allLabel)).map(label => label.dataValues.id), // a tad unecessary
      },
      transaction: t,
    }).then(([thread]) => db.Message.findOrCreate({
      where: { providerId: gmailPayload.id, mailboxId },
      defaults: {
        mailboxId: mailbox.dataValues.id,
        threadId: thread.dataValues.id,
        providerId: gmailPayload.id,
        receivedAt,
        size,
        payload,
      },
      transaction: t,
    })));

    return message;
  }
};

module.exports = syncMessage;
