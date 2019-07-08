const _ = require('lodash');

const { GraphQLString } = require('graphql');

const store = require('../store');
const { AccessTokenType } = require('../types');

module.exports = (generateToken) => {
  return {
    type: AccessTokenType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parents, { username, password }) {
      const credentials = _.find(store.userCredentials, { username, password });
      const token = generateToken(credentials.id);
      return { token };
    },
  }
};
