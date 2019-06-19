import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography, Chip, Divider, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}));

export default function EmailViewer(props) {
  const classes = useStyles();
  return (
    <Box p={3}>

      <Box mb={2}>
        <Chip label="Saturday, 25 May 2019" variant="outlined" />
      </Box>

      <Typography variant="h6" component="h1">Hello World</Typography>
      <Typography color="textSecondary">This is great lorem ipsum sit amet dolor</Typography>

      <Box my={2}>
        <Divider />
      </Box>

      <Button variant="contained" color="primary">Reply</Button>

    </Box>
   );
};
