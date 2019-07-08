import React, { useContext } from 'react';

import {
  CssBaseline,
  Box,
  Paper,
  Grid,
  Avatar,
  Typography
} from '@material-ui/core';

import { GoogleLogout } from 'react-google-login';

import { SetupContext } from '../hooks/SetupContext';

const MailboxViewScene = () => {
  const {
    isAuthenticated,
    profileObj,
    logout,
    clientId,
  } = useContext(SetupContext);

  if (!isAuthenticated()) return null;

  return (
    <Grid container>
      <Grid item sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <CssBaseline />
        <Paper>
          <Box p={3} mt={6}>
            <Avatar alt={profileObj.name} src={profileObj.imageUrl} />

            <Typography variant="h6">{profileObj.name}</Typography>
            <Typography variant="body1">{profileObj.email}</Typography>

            <hr />

            <p>If you do not wish to continue, you may log out and this will prevent further access to your Gmail account from this app.</p>
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={() => logout()}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};

export default MailboxViewScene;
