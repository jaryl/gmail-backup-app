import React, { useContext } from 'react';

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

import { GoogleLogin, GoogleLogout } from '../../components/GoogleButtons';

import SyncManager from './components/SyncManager';

const Profile = (props) => {
  return (
    <React.Fragment>
      <Typography>{props.profile.name}</Typography>
      <Typography>{props.profile.email}</Typography>
      <Avatar alt={props.profile.name} src={props.profile.imageUrl} />
      <GoogleLogout />
    </React.Fragment>
  );
};

const SyncScene = () => {
  const { logout } = useContext(AuthContext);
  const { profile, isAuthenticated } = useContext(GoogleContext);

  return (
    <Grid container>
      <Grid item lg={3}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>

        <CssBaseline />

        <Paper>
          <Box p={3} mt={6}>

            {profile && <Profile profile={profile} />}
            <GoogleLogin />

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
