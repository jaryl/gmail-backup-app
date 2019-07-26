import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { reverse } from 'lodash';

import EmailListing from '../components/EmailListing';

const MAX_ELEMENTS_IN_LIST = 100;

const THREADS_QUERY = gql`
query($mailboxId: ID!, $id: ID!, $after: String, $before: String, $first: Int, $last: Int) {
  mailbox(id: $mailboxId) {
    label(id: $id) {
      id
      name
      slug
      threadsConnection(after: $after, before: $before, first: $first, last: $last) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            lastMessage {
              id
              snippet
              receivedAt
            }
          }
        }
      }
    }
  }
}
`;

const updateBeforeQuery = (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev;

  prev.mailbox.label.threadsConnection.edges.push(...fetchMoreResult.mailbox.label.threadsConnection.edges);
  prev.mailbox.label.threadsConnection.edges.splice(0, prev.mailbox.label.threadsConnection.edges.length - MAX_ELEMENTS_IN_LIST);

  return {
    mailbox: {
      ...prev.mailbox,
      label: {
        ...prev.mailbox.label,
        threadsConnection: {
          ...prev.mailbox.label.threadsConnection,
          pageInfo: {
            ...prev.mailbox.label.threadsConnection.pageInfo,
            ...fetchMoreResult.mailbox.label.threadsConnection.pageInfo,
            startCursor: prev.mailbox.label.threadsConnection.edges[0].cursor,
            endCursor: prev.mailbox.label.threadsConnection.edges[prev.mailbox.label.threadsConnection.edges.length - 1].cursor,
          },
          edges: prev.mailbox.label.threadsConnection.edges,
        },
      },
    },
  };
};
const updateAfterQuery = (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev;

  prev.mailbox.label.threadsConnection.edges.unshift(...reverse(fetchMoreResult.mailbox.label.threadsConnection.edges));
  prev.mailbox.label.threadsConnection.edges.splice(-25, prev.mailbox.label.threadsConnection.edges.length - MAX_ELEMENTS_IN_LIST);

  return {
    mailbox: {
      ...prev.mailbox,
      label: {
        ...prev.mailbox.label,
        threadsConnection: {
          ...prev.mailbox.label.threadsConnection,
          pageInfo: {
            ...prev.mailbox.label.threadsConnection.pageInfo,
            ...fetchMoreResult.mailbox.label.threadsConnection.pageInfo,
            startCursor: prev.mailbox.label.threadsConnection.edges[0].cursor,
            endCursor: prev.mailbox.label.threadsConnection.edges[prev.mailbox.label.threadsConnection.edges.length - 1].cursor,
          },
          edges: prev.mailbox.label.threadsConnection.edges,
        },
      },
    },
  };
};

const EmailListingContainer = ({ mailbox, labelId, ...props }) => {
  return (
    <Query query={THREADS_QUERY} variables={{ mailboxId: mailbox.id, id: labelId }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;

        const { pageInfo, edges } = data.mailbox.label.threadsConnection;

        return (
          <EmailListing
            onLoadBefore={() => {
              fetchMore({
                variables: {
                  mailboxId: mailbox.id,
                  id: labelId,
                  before: pageInfo.endCursor,
                  first: 25,
                },
                updateQuery: updateBeforeQuery,
              });
            }}
            onLoadAfter={() => {
              fetchMore({
                variables: {
                  mailboxId: mailbox.id,
                  id: labelId,
                  after: pageInfo.startCursor,
                  last: 25,
                },
                updateQuery: updateAfterQuery,
              });
            }}
            pageInfo={pageInfo}
            edges={edges}
            {...props}
          />
        );
      }}
    </Query>
  );
};

export default EmailListingContainer;
