import React from 'react';

import {
  Grid,
  Paper,
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import addrs from 'email-addresses';
import base64url from 'base64url';
import parse from 'emailjs-mime-parser';

const Message = ({ message }) => {
  const email = parse(base64url.decode(message.payload));

  const msg = {
    from: addrs.parseOneAddress(email.headers.from[0].initial),
    to: addrs.parseAddressList(email.headers.to.map(header => header.initial).join(',')),
    cc: [],
    bcc: [],
    body: new TextDecoder('utf-8').decode(email.content),
  };

  return (
    <Box p={2}>
      <Paper>

        <Box px={3} py={2}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="body1">{msg.from.name || msg.from.email}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" align="right">{new Date(message.receivedAt).toGMTString()}</Typography>
            </Grid>
          </Grid>
        </Box>

        <ExpansionPanel square={false} elevation={0}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" color="primary">To: {msg.to.map(recipient => recipient.name || recipient.address).join(', ')}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
            <Typography variant="body2" color="primary">From: {email.headers.from[0].initial}</Typography>
            <Typography variant="body2" color="primary">To: {email.headers.to.map(header => header.initial).join(', ')}</Typography>
            {(!!email.headers.cc) && <Typography variant="body2" color="primary">Cc: {email.headers.cc.map(header => header.initial).join(', ')}</Typography>}
            {(!!email.headers.bcc) && <Typography variant="body2" color="primary">Bcc: {email.headers.bcc.map(header => header.initial).join(', ')}</Typography>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Box px={3} py={2}>
          <Typography variant="body2">{msg.body}</Typography>
        </Box>

      </Paper>
    </Box>
  );
};

export default Message;
