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
    $gmailPayload: GmailPayloadInput
  ) {
    syncMessage(
      mailboxId: $mailboxId,
      receivedAt: $receivedAt,
      snippet: $snippet,
      size: $size,
      providerType: GMAIL,
      labelIds: $labelIds,
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

    const variables = {
      mailboxId: mailbox.id,
      receivedAt: new Date(parseInt(result.internalDate, 10)),
      snippet: result.snippet,
      size: result.sizeEstimate,
      labelIds: result.labelIds || [],
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
