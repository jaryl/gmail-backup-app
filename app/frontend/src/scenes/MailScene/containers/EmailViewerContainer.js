import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import EmailViewer from '../scenes/EmailViewer';

const CONVERSATION_QUERY = gql`
query($id: ID!) {
  mailbox(token: "e953183d-7e9f-4a75-b5e1-5f7ff8ee6cd7") {
    thread(id: $id) {
      id
      snippet
      labels {
        id
        name
      }
      messages {
        id
        from
        to
        snippet
      }
    }
  }
}
`;

const EmailViewerContainer = ({ threadId }) => {
  return (
    <Query query={CONVERSATION_QUERY} variables={{ id: threadId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;
        return <EmailViewer thread={data.mailbox.thread} />;
      }}
    </Query>
  );
};

export default EmailViewerContainer;
