const jwt = require('jsonwebtoken');

const { GraphQLObjectType } = require('graphql');

const store = require('../store');

const authenticateMutation = require('./authenticate');
const registerMutation = require('./register');

const generateToken = userId => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
  userId,
}, store.JWT_SECRET);

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    authenticate: authenticateMutation(generateToken),
    register: registerMutation(generateToken),
  },
});

module.exports = { Mutation };
