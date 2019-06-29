import React, { useContext } from 'react';

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

import { PresentationContext } from '../../hooks/PresentationContext';

const EmailViewer = ({ match }) => {

  const { mailCache, conversationCache } = useContext(PresentationContext);

  const { getThread } = mailCache;
  const { getConversation } = conversationCache;

  const { title } = getThread(match.params.id);

  const formatter = ({ to, cc, bcc }) => { // TODO: improve this
    const toLine = `To: ${to.map(i => i)}`;
    const ccLine = `Cc: ${cc.map(i => i)}`;
    const bccLine = `Bcc: ${bcc.map(i => i)}`;

    return `${toLine}, ${ccLine}, ${bccLine}`;
  };

  const conversation = getConversation(match.params.id).map(({
    id, from, datetime, body, ...rest
  }) => <Box key={id} p={2}>
    <Paper>

      <Box px={3} py={2}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">{from}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body1" align="right">{datetime}</Typography>
          </Grid>
        </Grid>
      </Box>

      <ExpansionPanel square={false} elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2" color="primary">{formatter(rest)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" color="primary">More data</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Box px={3} py={2}>
        <Typography variant="body2">{body}</Typography>
      </Box>

    </Paper>
  </Box>);

  return (
    <div>
      <Paper square={true}>
        <Box p={3}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6" component="h1">{title}</Typography>
            </Grid>
            <Grid item xs align="right">
              <Chip label="Starred" variant="outlined" />
            </Grid>
          </Grid>
        </Box>

      </Paper>

      {conversation}

    </div>
  );
};

export default EmailViewer;
