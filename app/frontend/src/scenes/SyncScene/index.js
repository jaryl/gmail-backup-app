import React, { useContext } from 'react';

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

import SyncManager from './components/SyncManager';

const Profile = (props) => {
  return (
    <React.Fragment>
      <Typography>{props.profile.name}</Typography>
      <Typography>{props.profile.email}</Typography>
      <Avatar alt={props.profile.name} src={props.profile.imageUrl} />
      <GoogleLogout
        clientId={props.clientId}
        buttonText="Logout"
        onLogoutSuccess={props.handleLogoutResponse}
      />
    </React.Fragment>
  );
};

const SyncScene = () => {
  const { logout } = useContext(AuthContext);
  const {
    clientId,
    profile,
    handleLoginResponse,
    handleLogoutResponse,
    isAuthenticated,
  } = useContext(GoogleContext);

  const googleRenderlessDisplay = renderProps => <div {...renderProps} />;

  return (
    <Grid container>
      <Grid item lg={3}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>

        <CssBaseline />

        <Paper>
          <Box p={3} mt={6}>

            {profile && <Profile
              clientId={clientId}
              profile={profile}
              handleLogoutResponse={handleLogoutResponse}
            />}

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
              render={profile ? googleRenderlessDisplay : null}
            />

            <hr />

            {isAuthenticated ? (
              <SyncManager profile={profile} />
            ) : (
              <p>Please sign in with your Google account.</p>
            )}

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
