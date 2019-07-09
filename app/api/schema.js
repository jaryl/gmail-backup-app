const typeDefs = `
  scalar DateTime

  type Query {
    mailboxes(token: String): [Mailbox!]!
    mailbox(id: ID, token: String): Mailbox!
  }

  type Mutation {
    register(username: ID!, password: String!, name: String!, email: String!): AccessToken!
    authenticate(username: ID!, password: String!): AccessToken!
  }

  type AccessToken {
    token: String!
  }

  type Label {
    id: ID!
    name: String!
    slug: String!
    threads: [Thread]!
  }

  type Mailbox {
    id: ID!
    emailAddress: String!
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
