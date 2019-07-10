import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';
import { GoogleContext } from '../../contexts/GoogleContext';

const SyncScene = (props) => {
  const { logout } = useContext(AuthContext);
  const { clientId, profile, handleLoginResponse, logout: googleLogout } = useContext(GoogleContext);

  const googleLoginDisplay = renderProps => <div {...renderProps} />;

  const isMatch = (profile && (profile.email === 'jaryl.sim@gmail.com'));

  return (
    <Grid container>
      <Grid item lg={3}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>

        <CssBaseline />

        <Paper>
          <Box p={3} mt={6}>

            { profile && <React.Fragment>
                <Typography>{profile.name}</Typography>
                <Typography>{profile.email}</Typography>
                <Avatar alt={profile.name} src={profile.imageUrl} />
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={() => googleLogout()}
                />
              </React.Fragment>
            }

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
              render={profile ? googleLoginDisplay : null}
            />

            <hr />

            {isMatch ? 'Match' : 'Not matched'}
            <p>Progress goes here</p>

            <hr />

            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>

          </Box>
        </Paper>
      </Grid>
      <Grid item lg={3}></Grid>
    </Grid>
  );
};

export default SyncScene;
