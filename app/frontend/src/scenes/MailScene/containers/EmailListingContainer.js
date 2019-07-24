import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import EmailListing from '../components/EmailListing';

const THREADS_QUERY = gql`
query($mailboxId: ID!, $id: ID!) {
  mailbox(id: $mailboxId) {
    label(id: $id) {
      id
      name
      slug
      threadsConnection {
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

const EmailListingContainer = ({ mailbox, labelId, ...props }) => {
  return (
    <Query query={THREADS_QUERY} variables={{ mailboxId: mailbox.id, id: labelId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;
        const threads = data.mailbox.label.threadsConnection.edges.map(edge => edge.node);
        return <EmailListing threads={threads} {...props} />;
      }}
    </Query>
  );
};

export default EmailListingContainer;
