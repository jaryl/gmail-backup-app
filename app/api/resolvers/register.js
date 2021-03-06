const { ApolloError } = require('apollo-server-express');

const bcrypt = require('bcrypt');

const store = require('../store');

const register = async (parent, args, { db }) => {
  const {
    username,
    password,
    name,
    email,
    providerType,
    providerId,
    labels,
  } = args;

  const existingAccount = await db.Account.findOne({ where: { username } });
  if (existingAccount) throw new ApolloError('This username is already taken.', 'DUPLICATE_KEY', { field: 'username' });

  const account = await db.Account.create({
    username,
    password: await bcrypt.hash(password, 12),
    Mailboxes: [{
      name,
      email,
      providerType,
      providerId,
      Labels: [
        { providerId: 'ALL', name: 'All', type: 'app' },
        ...labels,
      ],
    }],
  }, {
    include: [{
      association: db.Account.associations.Mailboxes,
      include: [db.Mailbox.associations.Labels],
    }],
  });

  const mailboxes = await account.getMailboxes(); // TODO: sequelize might have a better approach to getting both account and maiblxoes

  const token = store.generateAccessToken(account.id, mailboxes.map(mailbox => mailbox.id));
  return { token };
};

module.exports = register;
