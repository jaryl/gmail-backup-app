import React from 'react';

import {
  Grid,
  Paper,
  Box,
  Typography,
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const EmailViewer = ({ thread }) => {
  const labels = thread.labels.map((label) => {
    return (<Chip key={label.id} label={label.name} variant="outlined" />);
  });

  const conversation = thread.messages.map((message) => {
    // TODO: reinstate this after parsing the payload

    // const to = `To: ${message.to.map(user => user.name).join(', ')}`;
    // const cc = (message.cc.length === 0) ? '' : `Cc: ${message.bcc.map(user => user.name).join(', ')}`;
    // const bcc = (message.bcc.length === 0) ? '' : `Bcc: ${message.bcc.map(user => user.name).join(', ')}`;
    // const headers = [to, cc, bcc].filter(v => !!v).join(', ');

    // const moreFrom = `${message.from.name} <${message.from.email}>`;
    // const moreTo = `${message.to.map(user => `${user.name} <${user.email}>`).join(', ')}`;
    // const moreCc = (message.cc.length === 0) ? '' : `Cc: ${message.to.map(user => `${user.name} <${user.email}>`).join(', ')}`;
    // const moreBcc = (message.bcc.length === 0) ? '' : `Bcc: ${message.to.map(user => `${user.name} <${user.email}>`).join(', ')}`;

    // TODO: for now, hard code some fake values

    const to = 'To: John Doe';
    const cc = 'Cc: Jane Doe';
    const bcc = 'Bcc: John Smith';
    const headers = [to, cc, bcc].filter(v => !!v).join(', ');

    const moreFrom = 'John Doe <john.doe@example.net>';
    const moreTo = 'Jane Doe <jane.doe@example.net>';

    return (
      <Box key={message.id} p={2}>
        <Paper>

          <Box px={3} py={2}>
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="body1">{message.from ? message.from.name : 'John Doe'}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" align="right">{new Date(message.receivedAt).toGMTString()}</Typography>
              </Grid>
            </Grid>
          </Box>

          <ExpansionPanel square={false} elevation={0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="primary">{headers}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <Typography variant="body2" color="primary">From: {moreFrom}</Typography>
              <Typography variant="body2" color="primary">To: {moreTo}</Typography>
              {/* {(message.cc.length > 0) && <Typography variant="body2" color="primary">Cc: {moreCc}</Typography>}
              {(message.bcc.length > 0) && <Typography variant="body2" color="primary">Bcc: {moreBcc}</Typography>} */}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Box px={3} py={2}>
            <Typography variant="body2">{message.snippet}</Typography>
          </Box>

        </Paper>
      </Box>
    );
  });

  // TODO: replace snippet with fully parsed payload body

  return (
    <div>
      <Paper square={true}>
        <Box p={3}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6" component="h1">{thread.snippet}</Typography>
            </Grid>
            <Grid item xs align="right">
              {labels}
            </Grid>
          </Grid>
        </Box>

      </Paper>

      {conversation}

    </div>
  );
};

export default EmailViewer;
