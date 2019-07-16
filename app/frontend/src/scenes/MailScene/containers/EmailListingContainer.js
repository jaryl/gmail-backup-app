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
      threads {
        id
        lastMessage {
          snippet
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
        return <EmailListing threads={data.mailbox.label.threads} {...props} />;
      }}
    </Query>
  );
};

export default EmailListingContainer;
