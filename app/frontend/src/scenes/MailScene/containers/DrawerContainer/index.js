import React, { useContext } from 'react';

import { Link, Redirect } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  Mail as MailIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

import { PresentationContext } from '../../hooks/PresentationContext';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

const DrawerContainer = ({ labels, ...props }) => {
  const classes = useStyles({ drawerWidth: 240 });
  const theme = useTheme();
  const open = props.drawerOpen;

  const {
    selectedLabel,
    selectLabelWithSlug,
    selectedThread,
  } = useContext(PresentationContext);

  return (
    <Drawer variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}>
      <div className={classes.toolbar}>
        <IconButton onClick={() => props.onCloseDrawer()}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>

      <Divider />

      <List component="nav">
        {labels.map(label => (
          <ListItem
            button
            key={label.id}
            selected={selectedLabel.slug === label.slug}
            onClick={() => selectLabelWithSlug(label.slug)}
            component={Link}
            to={{ pathname: selectedThread ? `/${label.slug}/${selectedThread.id}` : `/${label.slug}` }}
            replace={true}
          >
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={label.name} />
          </ListItem>
        ))}
      </List>

      <Divider />

    </Drawer>
  );
};

export default DrawerContainer;
