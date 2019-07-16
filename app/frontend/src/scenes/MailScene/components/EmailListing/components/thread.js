import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import Moment from 'react-moment';

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

  // const calendarStrings = {
  //   lastDay: '[Yesterday at] LT',
  //   sameDay: '[Today at] LT',
  //   nextDay: '[Tomorrow at] LT',
  //   lastWeek: '[last] dddd [at] LT',
  //   nextWeek: 'dddd [at] LT',
  //   sameElse: 'll',
  // };

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
      <ListItemText primary={thread.sender} secondary={thread.lastMessage.snippet} />
      <ListItemText className={classes.dateTimeDisplay} secondary={<Moment fromNow>{new Date(thread.lastMessage.receivedAt)}</Moment>} />

    </ListItem>
  );
};

export default Thread;
