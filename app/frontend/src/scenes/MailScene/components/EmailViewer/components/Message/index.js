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

import Moment from 'react-moment';

import addrs from 'email-addresses';
import base64url from 'base64url';
import parse from 'emailjs-mime-parser';

import Content from './components/content';
import Attachment from './components/attachment';

const extractContent = (node, results = []) => {
  switch (node.contentType.type) {
    case 'multipart':
      node.childNodes.forEach(childNode => extractContent(childNode, results));
      break;
    case 'text':
    case 'application':
      results.push({
        content: new TextDecoder('utf-8').decode(node.content),
        type: node.contentType.value,
        filename: node.contentType.params.name,
      });
      break;
    default:
      throw new Error(`Hit default case for ${node.contentType.value}`);
  }
  return results;
};

const Message = ({ message }) => {
  const email = parse(base64url.decode(message.payload));

  const extractedContent = extractContent(email);
  const content = extractedContent
    .filter(node => ['text/plain', 'text/html'].includes(node.type))
    .map((node, index) => <Content key={index} {...node} />);

  const attachments = extractedContent
    .filter(node => !['text/plain', 'text/html'].includes(node.type))
    .map((node, index) => <Attachment key={index} {...node} />);

  const msg = {
    from: addrs.parseOneAddress(email.headers.from[0].initial),
    to: addrs.parseAddressList(email.headers.to.map(header => header.initial).join(',')),
    cc: [],
    bcc: [],
    body: content,
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
              <Typography variant="body1" align="right">{<Moment fromNow>{new Date(message.receivedAt)}</Moment>}</Typography>
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
          {content}
        </Box>

        {attachments.length > 0 && (
          <React.Fragment>
            <hr />
            <Box px={3} py={2}>
              {attachments}
            </Box>
          </React.Fragment>
        )}

      </Paper>
    </Box>
  );
};

export default Message;
