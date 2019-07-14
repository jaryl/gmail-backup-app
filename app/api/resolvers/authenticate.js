const { ApolloError } = require('apollo-server-express');

const store = require('../store');

const authenticate = async (parent, { username, password }, { db }) => {
  const account = await db.Account.findOne({ where: { username, password } }); // TODO; password should be encrypted/salted
  if (!account) throw new ApolloError('Failed to authenticate', 'AUTH_FAILED', { field: ['username', 'password'] });
  const token = store.generateAccessToken(account.id);
  return { token };
};

module.exports = authenticate;
