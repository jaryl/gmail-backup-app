import { useReducer, useContext } from 'react';

import gql from 'graphql-tag';
import { ApolloContext } from 'react-apollo';

import { GoogleContext } from '../../../hooks/GoogleContext';

const SYNC_MESSAGE_MUTATION = gql`
  mutation (
    $mailboxId: ID!,
    $receivedAt: DateTime!,
    $snippet: String!,
    $size: Int!,
    $labelIds: [ID]!,
    $payload: String!,
    $gmailPayload: GmailPayloadInput
  ) {
    syncMessage(
      mailboxId: $mailboxId,
      receivedAt: $receivedAt,
      snippet: $snippet,
      size: $size,
      providerType: GMAIL,
      labelIds: $labelIds,
      payload: $payload,
      gmailPayload: $gmailPayload
    )
    {
      id
    }
  }
`;

const performSync = async (token, dispatch, api, client, mailbox) => {
  const { result: r } = await api.getAllMessage(token);
  const { messages, nextPageToken } = r;

  const results = await messages.map(async ({ id }) => {
    const { result } = await api.getMessage(id);

    // TODO: use fake data now, replace with direct upload to S3
    const payload = 'VG86IHJtLTBiNnMxejFjYmd3bWJmc2F1MTZ1YWZxbWFiNWszeG1AZW0uZWEuY29tDQpGcm9tOiAiSmFyeWwgU2ltIiA8amFyeWwuc2ltQGdtYWlsLmNvbT4NCkRhdGU6IFdlZCwgMTAgU2VwIDIwMTQgMTg6MTY6MDAgLTA3MDANCk1lc3NhZ2UtSUQ6IDxDQUc1WW1SK3JQZndRN0x6YStjVnRXN3ZwbkNqVGZRcE9FdWV0dDM5YVlNKzVhc2gzWXdAbWFpbC5nbWFpbC5jb20-DQpTdWJqZWN0OiB1bnN1YnNjcmliZQ0KTUlNRS1WZXJzaW9uOiAxLjANCkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD1VVEYtOA0KQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogN2JpdA0KQ29udGVudC1EaXNwb3NpdGlvbjogaW5saW5lDQoNClRoaXMgbWVzc2FnZSB3YXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgR21haWwuDQo=';

    const variables = {
      mailboxId: mailbox.id,
      receivedAt: new Date(parseInt(result.internalDate, 10)),
      snippet: result.snippet,
      size: result.sizeEstimate,
      labelIds: result.labelIds || [],
      payload,
      gmailPayload: {
        id: result.id,
        threadId: result.threadId,
        historyId: result.historyId,
      },
    };

    const mutation = await client.mutate({
      mutation: SYNC_MESSAGE_MUTATION,
      variables,
    });

    return mutation;
  });

  dispatch({
    type: 'tick',
    payload: {
      messages: results.length,
      nextPageToken,
    },
  });
  if (!nextPageToken) {
    dispatch({ type: 'stop' });
  } else {
    performSync(nextPageToken, dispatch, api, client, mailbox);
  }
};

const initialState = {
  messages: 0,
  nextPageToken: null,
  status: 'pending',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        messages: 0,
        nextPageToken: null,
        status: 'started',
      };
    case 'stop':
      return {
        ...state,
        nextPageToken: null,
        status: 'stopped',
      };
    case 'tick':
      return {
        ...state,
        messages: state.messages + action.payload.messages,
        nextPageToken: action.payload.nextPageToken,
      };
    default:
      throw new Error('invalid dispatch');
  }
};

const useMessageSynchronizer = (mailbox) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { client } = useContext(ApolloContext);
  const { api } = useContext(GoogleContext);

  const start = () => {
    dispatch({ type: 'start' });
    performSync(null, dispatch, api, client, mailbox);
  };

  return [
    state,
    start,
  ];
};

export default useMessageSynchronizer;
