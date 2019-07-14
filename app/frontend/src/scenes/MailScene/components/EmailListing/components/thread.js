import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import {
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { PresentationContext } from '../../../hooks/PresentationContext';

const useStyles = makeStyles(() => ({
  avatar: {
    minWidth: '16px',
  },
  listItem: {
    alignItems: 'flex-start',
  },
  dateTimeDisplay: {
    whiteSpace: 'nowrap',
  },
}));

const Thread = ({ thread, mailboxIndex }) => {
  const classes = useStyles();
  const { selectedLabel, selectedThread, selectThread } = useContext(PresentationContext);

  return (
    <ListItem
      button
      className={classes.listItem}
      divider={true}
      selected={selectedThread && selectedThread.id === thread.id}
      onClick={() => selectThread(thread.id)}
      component={Link}
      to={{ pathname: `/${mailboxIndex}/${selectedLabel.slug}/${thread.id}` }}
      replace={true}
    >
      <ListItemAvatar className={classes.avatar}>
        <Badge color="primary" variant="dot"><React.Fragment /></Badge>
      </ListItemAvatar>
      <ListItemText primary={thread.sender} secondary={'thread.snippet is no more'} />
      <ListItemText className={classes.dateTimeDisplay} secondary={thread.datetime} />
    </ListItem>
  );
};

export default Thread;
