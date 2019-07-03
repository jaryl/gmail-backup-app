import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import EmailListing from '../scenes/EmailListing';

const THREADS_QUERY = gql`
query($id: ID!) {
  mailbox(token: "e953183d-7e9f-4a75-b5e1-5f7ff8ee6cd7") {
    label(id: $id) {
      id
      name
      slug
      threads {
        id
        snippet
      }
    }
  }
}
`;

const EmailListingContainer = ({ labelId }) => {
  return (
    <Query query={THREADS_QUERY} variables={{ id: labelId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;
        return <EmailListing threads={data.mailbox.label.threads} />;
      }}
    </Query>
  );
};

export default EmailListingContainer;
