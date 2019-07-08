const _ = require('lodash');
const uuidv4 = require('uuid/v4');

const { GraphQLString } = require('graphql');

const store = require('../store');
const { AccessTokenType } = require('../types');

module.exports = (generateToken) => {
  return {
    type: AccessTokenType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve(parents, args) {
      if (_.find(store.userCredentials, { username: args.username })) throw new Error('This username is already taken.');

      const newUser = {
        id: uuidv4(),
        username: args.username,
        password: args.password,
      };
      store.userCredentials.push(newUser);

      const newMailbox = {
        id: uuidv4(),
        userId: newUser.id,
        emailAddress: args.emailAddress,
        messagesTotal: 0,
        threadsTotal: 0,
      };
      store.mailboxData.push(newMailbox);

      const token = generateToken(newUser.id);
      return { token };
    },
  };
};
