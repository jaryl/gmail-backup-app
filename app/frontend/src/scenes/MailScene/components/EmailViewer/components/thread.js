import React from 'react';

import {
  Grid,
  Paper,
  Box,
  Typography,
  Chip,
} from '@material-ui/core';

const Thread = ({ thread, subject }) => {
  const labels = thread.labels.map(label => <Chip key={label.id} label={label.name} variant="outlined" />);

  return (
    <Paper square={true}>
      <Box p={3}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" component="h1" dangerouslySetInnerHTML={{ __html: subject }} />
          </Grid>
          <Grid item xs align="right">
            {labels}
          </Grid>
        </Grid>
      </Box>

    </Paper>
  );
};

export default Thread;
