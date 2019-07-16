const { ApolloError } = require('apollo-server-express');

const bcrypt = require('bcrypt');

const store = require('../store');

const authenticate = async (parent, { username, password }, { db }) => {
  const account = await db.Account.findOne({ where: { username } }); // TODO; password should be encrypted/salted
  const successful = await bcrypt.compare(password, account.password);
  if (successful) {
    const mailboxes = await account.getMailboxes();
    const token = store.generateAccessToken(account.id, mailboxes.map(mailbox => mailbox.id));
    return { token };
  }
  throw new ApolloError('Failed to authenticate', 'AUTH_FAILED', { field: ['username', 'password'] });
};

module.exports = authenticate;
