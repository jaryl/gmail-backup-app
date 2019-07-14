import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import {
  CssBaseline,
  Box,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

import base64url from 'base64url';
import parse from 'emailjs-mime-parser';

import EmailViewer from '../components/EmailViewer';

const CONVERSATION_QUERY = gql`
query($mailboxId: ID!, $id: ID!) {
  mailbox(id: $mailboxId) {
    thread(id: $id) {
      id
      snippet
      labels {
        id
        name
      }
      messages {
        id
        snippet
        receivedAt
        size
        payload
      }
    }
  }
}
`;

const EmailViewerContainer = ({ mailbox, threadId, ...props }) => {
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
    <Query query={CONVERSATION_QUERY} variables={{ mailboxId: mailbox.id, id: threadId }}>
      {({ loading, error, data }) => {
        if (loading) return loadingView;
        if (error) return errorView(error.message);
        return <EmailViewer thread={data.mailbox.thread} {...props} />;
      }}
    </Query>
  );
};

export default EmailViewerContainer;
