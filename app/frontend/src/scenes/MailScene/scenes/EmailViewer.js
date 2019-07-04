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
    return (
      <Box key={message.id} p={2}>
        <Paper>

          <Box px={3} py={2}>
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="body1">{message.from}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" align="right">{"DATE GOES HERE"}</Typography>
              </Grid>
            </Grid>
          </Box>

          <ExpansionPanel square={false} elevation={0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="primary">{"HEADERS GO HERE"}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body2" color="primary">More data</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Box px={3} py={2}>
            <Typography variant="body2">{message.snippet}</Typography>
          </Box>

        </Paper>
      </Box>
    );
  });

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
