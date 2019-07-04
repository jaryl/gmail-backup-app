const graphql = require('graphql');
const { Kind } = require('graphql/language');

const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLScalarType,
} = graphql;

const userData = [
  { name: 'John Doe', email: 'john.doe@example.net', owner: false },
  { name: 'Jane Doe', email: 'jane.doe@example.net', owner: false },
  { name: 'John Smith', email: 'john.smith@example.net', owner: false },
];

const labelData = [
  { mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', id: '712e0a64-6564-4951-a181-1b15ee101e8c', name: 'All', slug: 'all' },
  { mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', id: 'f4f73538-e9c2-429c-8bb4-7e1535036198', name: 'Important', slug: 'important' },
  { mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', id: '0ea950c4-1488-45fa-a7b2-b25fb8602934', name: 'Clients', slug: 'clients' },

  { mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', id: 'dfe745a8-992b-4536-8f1a-3a8c66bbf93b', name: 'All', slug: 'all' },
  { mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', id: 'e43f42d9-9eef-4c78-b158-77b245cbda0b', name: 'Important', slug: 'important' },
  { mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', id: 'ae602a7c-57ce-4466-a7dd-db507388534b', name: 'Design', slug: 'design' },
];

const threadData = [
  { id: '74d5bca9-c52f-4aac-a0c6-9b07d61cb16a', mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', labelIds: ['712e0a64-6564-4951-a181-1b15ee101e8c', 'f4f73538-e9c2-429c-8bb4-7e1535036198', '0ea950c4-1488-45fa-a7b2-b25fb8602934'], snippet: 'John: Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { id: '31b2e30f-bcb7-4dc0-82d3-c64af76653f9', mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', labelIds: ['712e0a64-6564-4951-a181-1b15ee101e8c', 'f4f73538-e9c2-429c-8bb4-7e1535036198'], snippet: 'John: Ut enim ad minim veniam, quis nostrud exercitation' },
  { id: 'b216ced9-a1c5-40a6-954b-22e51555d70e', mailboxId: '80a9521e-c07a-4b21-aca3-66eea0fefe13', labelIds: ['712e0a64-6564-4951-a181-1b15ee101e8c'], snippet: 'John: Neque purus posuere quam ultricies facilisis a semper proin eros' },

  { id: '658b95d5-bc1b-4cfc-b4e8-0c06dae4e8d4', mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', labelIds: ['dfe745a8-992b-4536-8f1a-3a8c66bbf93b', 'e43f42d9-9eef-4c78-b158-77b245cbda0b', 'ae602a7c-57ce-4466-a7dd-db507388534b'], snippet: 'Jane: Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { id: 'ff518a7d-b74f-448c-8df7-5fbbefd2395a', mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', labelIds: ['dfe745a8-992b-4536-8f1a-3a8c66bbf93b', 'e43f42d9-9eef-4c78-b158-77b245cbda0b'], snippet: 'Jane: Ut enim ad minim veniam, quis nostrud exercitation' },
  { id: '68bc097c-1e2e-4b5f-a8f8-cae4ee0b4f3c', mailboxId: 'd71590d1-784c-4b5b-84cd-f548adb4c723', labelIds: ['dfe745a8-992b-4536-8f1a-3a8c66bbf93b'], snippet: 'Jane: Neque purus posuere quam ultricies facilisis a semper proin eros' },
];

const messageData = [

  // messages for mailbox '80a9521e-c07a-4b21-aca3-66eea0fefe13'
  { threadId: '74d5bca9-c52f-4aac-a0c6-9b07d61cb16a', id: '09b6eec2-2cc2-407d-993e-4a9fbc597447', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '74d5bca9-c52f-4aac-a0c6-9b07d61cb16a', id: '21cb9276-bcef-4e75-b08d-3bbd35f0a8d8', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '74d5bca9-c52f-4aac-a0c6-9b07d61cb16a', id: '08e16133-8e78-4e20-b20c-009351d27d7e', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

  { threadId: '31b2e30f-bcb7-4dc0-82d3-c64af76653f9', id: '2fa94ae4-3777-41ce-ab81-41128ab3d501', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '31b2e30f-bcb7-4dc0-82d3-c64af76653f9', id: 'fe9cacd3-6490-4d96-a0af-2c6755588bac', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '31b2e30f-bcb7-4dc0-82d3-c64af76653f9', id: 'bd6ad865-8e9c-49b6-9d4e-4a962d65975d', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

  { threadId: 'b216ced9-a1c5-40a6-954b-22e51555d70e', id: 'd6712adf-91df-42f7-be5a-3871daa7e43e', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: 'b216ced9-a1c5-40a6-954b-22e51555d70e', id: 'e64ed7fb-863f-4342-821c-69d66688e0a8', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: 'b216ced9-a1c5-40a6-954b-22e51555d70e', id: '529d0dc8-fa05-4955-acc1-232ace296b83', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

  // messages for mailbox 'd71590d1-784c-4b5b-84cd-f548adb4c723'
  { threadId: '658b95d5-bc1b-4cfc-b4e8-0c06dae4e8d4', id: '7435b452-348c-4c07-995d-e1441342a84e', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '658b95d5-bc1b-4cfc-b4e8-0c06dae4e8d4', id: '4b40fe27-8f88-4696-bf8c-fbb89e6d6088', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '658b95d5-bc1b-4cfc-b4e8-0c06dae4e8d4', id: '0172f91f-4d5c-430c-80f3-2241c736a270', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

  { threadId: 'ff518a7d-b74f-448c-8df7-5fbbefd2395a', id: '6d9e0542-4eeb-4fde-8a2c-0375609fcb9d', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: 'ff518a7d-b74f-448c-8df7-5fbbefd2395a', id: '073651bc-1e98-45fe-b876-308672492cf3', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: 'ff518a7d-b74f-448c-8df7-5fbbefd2395a', id: '60df4ca6-6bda-43fb-a30e-73ef1c3da014', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

  { threadId: '68bc097c-1e2e-4b5f-a8f8-cae4ee0b4f3c', id: '96420806-dde1-4444-96c1-88f88bcfa69d', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.doe@example.net', to: ['jane.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '68bc097c-1e2e-4b5f-a8f8-cae4ee0b4f3c', id: 'a1c28572-ee58-41c6-88e7-f9dbb2152b3c', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'jane.doe@example.net', to: ['john.doe@example.net', 'john.smith@example.net'], cc: [], bcc: [] },
  { threadId: '68bc097c-1e2e-4b5f-a8f8-cae4ee0b4f3c', id: 'b048d38d-45bd-47f5-8e71-3cd552a7c426', timestamp: new Date(1562235612675), snippet: 'Nunc curae eget sociosqu maximus viverra rhoncus tellus luctus velit, et magna amet aliquam potenti suscipit volutpat enim.', from: 'john.smith@example.net', to: ['jane.doe@example.net', 'john.doe@example.net'], cc: [], bcc: [] },

];

const AccessTokenType = new GraphQLObjectType({
  name: 'AccessToken',
  type: 'Query',
  fields: () => ({
    token: { type: GraphQLID },
  }),
});

const MailboxType = new GraphQLObjectType({
  name: 'Mailbox',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    emailAddress: { type: GraphQLString },
    messagesTotal: { type: GraphQLString },
    threadsTotal: { type: GraphQLString },
    labels: {
      type: new GraphQLList(LabelType),
      resolve(parent, args) {
        return _.filter(labelData, { mailboxId: parent.id });
      },
    },
    label: {
      type: LabelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(labelData, { id });
      },
    },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return _.filter(threadData, { mailboxId: parent.id });
      },
    },
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(threadData, { id });
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return _.filter(messageData, { mailboxId: parent.id });
      },
    },
  }),
});

const LabelType = new GraphQLObjectType({
  name: 'Label',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return _.filter(threadData, thread => _.includes(thread.labelIds, parent.id));
      },
    }
  }),
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    snippet: { type: GraphQLString },
    labels: {
      type: new GraphQLList(LabelType),
      resolve(parent, args) {
        // TODO: use real data
        return _.filter(labelData, label => _.includes(parent.labelIds, label.id));
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return _.filter(messageData, { threadId: parent.id });
      },
    },
  }),
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  type: 'Query',
  fields: () => ({
    id: { type: GraphQLID },
    threadId: { type: GraphQLID },
    labelIds: { type: GraphQLString },
    snippet: { type: GraphQLString },
    timestamp: { type: DateScalarType },
    from: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { email: parent.from });
      },
    },
    to: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(userData, user => parent.to.includes(user.email));
      },
    },
    cc: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(userData, user => parent.cc.includes(user.email));
      },
    },
    bcc: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return _.filter(userData, user => parent.bcc.includes(user.email));
      },
    },
    thread: {
      type: MessageType,
      resolve(parent, args) {
        return _.find(messageData, { id: parent.threadId });
      },
    },
    // TODO: internalDate, payload, sizeEstimate, raw, etc
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  type: 'Query',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    owner: { type: GraphQLBoolean },
  }),
});

const DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

module.exports = {
  AccessTokenType,
  MailboxType,
  LabelType,
  ThreadType,
  MessageType,
  DateScalarType,
};
