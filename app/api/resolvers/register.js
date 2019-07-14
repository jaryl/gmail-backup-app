const { ApolloError } = require('apollo-server-express');

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
    password,
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

  const token = store.generateAccessToken(account.id);
  return { token };
};

module.exports = register;
