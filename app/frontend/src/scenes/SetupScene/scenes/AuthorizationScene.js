import React, { useContext } from 'react';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
} from '@material-ui/core';

import { GoogleContext } from '../../../hooks/GoogleContext';
import { GoogleLogin } from '../../../components/GoogleButtons';

const AuthorizationScene = () => {
  const { isAuthenticated } = useContext(GoogleContext);

  if (isAuthenticated) return null;

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <CssBaseline />
        <Paper>
          <Box p={3} mt={6}>
            <GoogleLogin />
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default AuthorizationScene;
