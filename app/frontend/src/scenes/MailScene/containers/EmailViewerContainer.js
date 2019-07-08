import React, { useContext } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import {
  CssBaseline,
  Box,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

import EmailViewer from '../scenes/EmailViewer';

const CONVERSATION_QUERY = gql`
fragment UserParts on User {
  name
  email
}

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
        from { ...UserParts }
        to { ...UserParts }
        cc { ...UserParts }
        bcc { ...UserParts }
        snippet
        timestamp
      }
    }
  }
}
`;

const EmailViewerContainer = ({ threadId }) => {
  const loadingView = <Grid container>
    <Grid item sm={2} md={3} lg={4}></Grid>
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <CssBaseline />
      <Paper>
        <Box p={3} mt={6}>
          <Typography align="center" variant="h6">Loading...</Typography>
        </Box>
      </Paper>
    </Grid>
    <Grid item sm={2} md={3} lg={4}></Grid>
  </Grid>;

  const errorView = message => (<Grid container>
    <Grid item sm={2} md={3} lg={4}></Grid>
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <CssBaseline />
      <Paper>
        <Box p={3} mt={6}>
          <Typography align="center" variant="h6">Something went wrong</Typography>
          <Typography align="center" variant="body1">{message}</Typography>
        </Box>
      </Paper>
    </Grid>
    <Grid item sm={2} md={3} lg={4}></Grid>
  </Grid>);

  return (
    <Query query={CONVERSATION_QUERY} variables={{ id: threadId }}>
      {({ loading, error, data }) => {
        if (loading) return loadingView;
        if (error) return errorView(error.message);
        return <EmailViewer thread={data.mailbox.thread} />;
      }}
    </Query>
  );
};

export default EmailViewerContainer;
