import React, { useContext } from 'react';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
} from '@material-ui/core';

import { GoogleLogin } from 'react-google-login';

import { GoogleContext } from '../../../hooks/GoogleContext';

const AuthorizationScene = () => {
  const { clientId, isAuthenticated, handleLoginResponse } = useContext(GoogleContext);

  if (isAuthenticated) return null;

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <CssBaseline />
        <Paper>
          <Box p={3} mt={6}>
            <GoogleLogin
              clientId={clientId}
              buttonText='Sign in with Google'
              scope='profile email https://www.googleapis.com/auth/gmail.readonly'
              onSuccess={handleLoginResponse}
              onFailure={handleLoginResponse}
              cookiePolicy={'single_host_origin'}
              theme='dark'
              prompt='consent'
              isSignedIn={true}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default AuthorizationScene;
