import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
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
}));

export default function MainAppBar(props) {
  const classes = useStyles(props);
  // const theme = useTheme();

  return (
    <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: props.open, }) }>
      <Toolbar>
        <IconButton color="inherit" aria-label="Open drawer" onClick={() => props.onOpenDrawer()} edge="start" className={clsx(classes.menuButton, { [classes.hide]: props.open, })}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>Hello World</Typography>
      </Toolbar>
    </AppBar>
  );
};
