import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import MainAppBar from '../../../components/mainappbar';
import MainDrawer from '../../../components/maindrawer';

import EmailListing from '../../../components/emaillisting';
import EmailViewer from '../../../components/emailviewer';

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

export default function MailClient(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>

      <CssBaseline />

      <MainAppBar open={open} drawerWidth={240} onOpenDrawer={() => setOpen(true)} />
      <MainDrawer open={open} drawerWidth={240} onCloseDrawer={() => setOpen(false)} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Grid container spacing={0} direction="row">
          <Grid item xs={3} alignItems="stretch">
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
  );
};
