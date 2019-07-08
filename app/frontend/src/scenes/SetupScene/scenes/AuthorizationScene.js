import React, { useContext } from 'react';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
} from '@material-ui/core';

import { GoogleLogin } from 'react-google-login';

import { SetupContext } from '../hooks/SetupContext';

const AuthorizationScene = () => {
  const { clientId, isAuthenticated, login } = useContext(SetupContext);

  if (isAuthenticated()) return null;

  const handleSuccess = (response) => {
    login(response.tokenObj, response.profileObj);
  };

  const handleFailure = (response) => {
    console.log(response);
  };

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
              onSuccess={handleSuccess}
              onFailure={handleFailure}
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
