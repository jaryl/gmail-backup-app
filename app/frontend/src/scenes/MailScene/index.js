import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import { AuthContext } from '../../contexts/AuthContext';

import AppBarContainer from './containers/AppBarContainer';
import DrawerContainer from './containers/DrawerContainer';

import EmailListing from './containers/EmailListing';
import EmailViewer from './containers/EmailViewer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  paper: {
    height: '100vh',
  },
}));

export default function MailScene(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AuthContext.Consumer>
      { ({ loggedIn, login, logout }) =>
        <div className={classes.root}>

          <AppBarContainer drawerOpen={drawerOpen} drawerWidth={240} onOpenDrawer={() => setDrawerOpen(true)} onLogout={() => logout()} />
          <DrawerContainer drawerOpen={drawerOpen} drawerWidth={240} onCloseDrawer={() => setDrawerOpen(false)} />

          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid container spacing={0} direction="row">
              <Grid item xs={3}>
                <Paper square={true} className={classes.paper}>
                  <EmailListing></EmailListing>
                </Paper>
              </Grid>

              <Grid item xs>
                <EmailViewer></EmailViewer>
              </Grid>
            </Grid>

          </main>

        </div>
      }
    </AuthContext.Consumer>
  );
};
