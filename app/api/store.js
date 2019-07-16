const jwt = require('jsonwebtoken');

const JWT_SECRET = 'some random secret'; // TODO: replace with key from ENV

const generateAccessToken = (accountId, mailboxIds) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
  accountId,
  mailboxIds,
}, JWT_SECRET);

module.exports = {
  JWT_SECRET,
  generateAccessToken,
};
