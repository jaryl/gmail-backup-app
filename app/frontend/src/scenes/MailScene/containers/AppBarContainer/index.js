import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  mainAppTitle: {
    flexGrow: 1,
  },
}));

const AppBarContainer = (props) => {
  const classes = useStyles(props);

  const handleLogout = () => {
    props.onLogout();
  };

  return (
    <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: props.drawerOpen, }) }>
      <Toolbar>
        <IconButton color="inherit" aria-label="Open drawer" onClick={() => props.onOpenDrawer()} edge="start" className={clsx(classes.menuButton, { [classes.hide]: props.drawerOpen, })}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.mainAppTitle}>Gmail Backup App</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarContainer;
