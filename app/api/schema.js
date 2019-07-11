const typeDefs = `
  scalar DateTime

  type Query {
    mailboxes(token: String): [Mailbox!]!
    mailbox(id: ID, token: String): Mailbox!
  }

  type Mutation {
    register(username: ID!, password: String!, name: String!, email: String!, providerType: Provider!, providerId: String!, labels: [LabelInput!]!): AccessToken!
    authenticate(username: ID!, password: String!): AccessToken!
  }

  input LabelInput {
    externalId: ID!
    name: String!
    type: String!
  }

  enum Provider {
    GMAIL
  }

  type AccessToken {
    token: String!
  }

  type Label {
    id: ID!
    externalId: ID!
    name: String!
    slug: String!
    type: String!
    threads: [Thread]!
  }

  type Mailbox {
    id: ID!
    email: String!
    labels: [Label]!
    label(id: ID!): Label!
    threads: [Thread]!
    thread(id: ID!): Thread!
    messages: [Message]!
  }

  type Message {
    id: ID!
    threadId: ID!
    snippet: String!
    timestamp: DateTime!
    thread: Thread!
    from: User!
    to: [User!]!
    cc: [User]!
    bcc: [User]!
  }

  type Thread {
    id: ID!
    snippet: String!
    labels: [Label]!
    messages: [Message!]!
  }

  type User {
    name: String
    email: String!
  }
`;

module.exports = typeDefs;
