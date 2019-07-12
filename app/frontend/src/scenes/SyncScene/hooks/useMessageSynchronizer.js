import { useReducer, useContext } from 'react';

import gql from 'graphql-tag';
import { ApolloContext } from 'react-apollo';

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

const performSync = (token, dispatch, client, mailbox) => {
  const params = token ? `?pageToken=${token}` : '';
  window.gapi.client.request({ path: `https://www.googleapis.com/gmail/v1/users/me/messages${params}` })
    .then(async (response) => {
      const messages = response.result.messages.map(async ({ id }) => {
        const { body, headers, result } = await window.gapi.client.request({ path: `https://www.googleapis.com/gmail/v1/users/me/messages/${id}?fields=id,threadId,labelIds,historyId,internalDate,snippet,sizeEstimate` });

        if (!client) throw new Error('WHY NO CLIENT?');

        const variables = {
          mailboxId: mailbox.id,
          receivedAt: new Date(parseInt(result.internalDate, 10)),
          snippet: result.snippet,
          size: result.sizeEstimate,
          labelIds: result.labelIds,
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
      });

      return response;
    })
    .then((response) => {
      dispatch({
        type: 'tick',
        payload: {
          messages: response.result.messages.length,
          nextPageToken: response.result.nextPageToken,
        },
      });
      if (!response.result.nextPageToken) {
        dispatch({ type: 'stop' });
      } else {
        performSync(response.result.nextPageToken, dispatch, client, mailbox);
      }
    })
    .catch((error) => {
      console.log(error);
    });
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

  const start = () => {
    dispatch({ type: 'start' });
    performSync(null, dispatch, client, mailbox);
  };

  return [
    state,
    start,
  ];
};

export default useMessageSynchronizer;
