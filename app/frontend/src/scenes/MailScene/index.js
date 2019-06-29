import React, { useState, useContext } from 'react';

import { Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper } from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';
import { PresentationContextProvider } from './hooks/PresentationContext';

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

const MailScene = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <PresentationContextProvider>

        <CssBaseline />

        <AppBarContainer
          drawerOpen={drawerOpen}
          drawerWidth={240}
          onOpenDrawer={() => setDrawerOpen(true)} onLogout={logout}
        />

        <DrawerContainer
          drawerOpen={drawerOpen}
          drawerWidth={240}
          onCloseDrawer={() => setDrawerOpen(false)}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Grid container spacing={0} direction="row">
            <Grid item xs={3}>
              <Paper square={true} className={classes.paper}>
                <Route path="/:label" component={EmailListing} />
              </Paper>
            </Grid>

            <Grid item xs>
              <Route path="/:label/:id" component={EmailViewer} />
            </Grid>
          </Grid>

        </main>

      </PresentationContextProvider>
    </div>
  );
};

export default MailScene;
