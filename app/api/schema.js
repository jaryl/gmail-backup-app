const typeDefs = `
  scalar DateTime

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    mailboxes: [Mailbox!]!
    mailbox(id: ID!): Mailbox!
  }

  type Mutation {
    register(username: ID!,
      password: String!,
      name: String!,
      email: String!,
      providerType: Provider!,
      providerId: String!,
      labels: [LabelInput!]!
    ): AccessToken!

    authenticate(
      username: ID!,
      password: String!
    ): AccessToken!

    syncMessage(
      mailboxId: ID!,
      receivedAt: DateTime!,
      size: Int!,
      providerType: Provider!,
      labelIds: [ID]!,
      payload: String!,
      snippet: String,
      gmailPayload: GmailPayloadInput
    ): Message!
  }

  input LabelInput {
    providerId: ID!
    name: String!
    type: String!
  }

  input GmailPayloadInput {
    id: ID!
    threadId: ID!
    historyId: ID!
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
    threadsConnection(first: Int, after: String, last: Int, before: String): LabelThreadsConnection
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
    receivedAt: DateTime!
    size: Int!
    labels: [Label]!
    payload: String!
    snippet: String!
    thread: Thread!
  }

  type Thread {
    id: ID!
    labels: [Label]!
    messages: [Message!]!
    lastMessage: Message!
  }

  type User {
    name: String
    email: String!
  }

  type LabelThreadsConnection {
    pageInfo: PageInfo!
    edges: [LabelThreadsEdge]
  }

  type LabelThreadsEdge {
    cursor: String!
    node: Thread
  }
`;

module.exports = typeDefs;
