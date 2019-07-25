import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import EmailListing from '../components/EmailListing';

const THREADS_QUERY = gql`
query($mailboxId: ID!, $id: ID!, $after: String) {
  mailbox(id: $mailboxId) {
    label(id: $id) {
      id
      name
      slug
      threadsConnection(after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
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

const updateQuery = (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev;
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
          },
          edges: [
            ...prev.mailbox.label.threadsConnection.edges,
            ...fetchMoreResult.mailbox.label.threadsConnection.edges,
          ],
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
            onLoadMore={() => {
              fetchMore({
                variables: {
                  mailboxId: mailbox.id,
                  id: labelId,
                  after: pageInfo.endCursor,
                },
                updateQuery,
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
