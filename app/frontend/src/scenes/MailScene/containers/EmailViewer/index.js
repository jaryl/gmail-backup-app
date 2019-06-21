import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Box, Typography, Chip, Divider, Button } from '@material-ui/core';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
}));

export default function EmailViewer(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper square={true}>
        <Box p={3}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6" component="h1">Lorem ipsum sit amet dolor</Typography>
            </Grid>
            <Grid item xs align="right">
              <Chip label="Starred" variant="outlined" />
            </Grid>
          </Grid>
        </Box>

      </Paper>

      <Box p={2}>
        <Paper>

          <Box px={3} py={2}>
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="body1">John Doe</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" align="right">Saturday, 25 May 2019</Typography>
              </Grid>
            </Grid>
          </Box>

          <ExpansionPanel square={false} elevation={0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="primary">To: John Doe, CC: Jane Doe</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body2" color="primary">More data</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Box px={3} py={2}>
            <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
          </Box>

        </Paper>
      </Box>

      <Box p={2}>
        <Paper>

          <Box px={3} py={2}>
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="body1">John Doe</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" align="right">Saturday, 25 May 2019</Typography>
              </Grid>
            </Grid>
          </Box>

          <ExpansionPanel square={false} elevation={0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="primary">To: John Doe, CC: Jane Doe</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body2" color="primary">More data</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Box px={3} py={2}>
            <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
          </Box>

        </Paper>
      </Box>

    </div>
   );
};
