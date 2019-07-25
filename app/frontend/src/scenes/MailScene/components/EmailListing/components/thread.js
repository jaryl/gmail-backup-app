import React, { useContext, useRef, useEffect } from 'react';

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
import { ScrollContext } from '../../../../../hooks/ScrollContext';

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

const Thread = ({ thread, mailboxIndex, cursor, checkIfLastCursor }) => {
  const classes = useStyles();
  const { selectedLabel, selectedThread, selectThread } = useContext(PresentationContext);
  const { scrollPosition } = useContext(ScrollContext);

  const element = useRef(null);

  useEffect(() => {
    if (!element.current) return;
    if (element.current.getBoundingClientRect().bottom <= scrollPosition) {
      checkIfLastCursor(cursor);
    }
  }, [scrollPosition]);

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
      <ListItemText primary={thread.sender} secondary={<span dangerouslySetInnerHTML={{ __html: thread.lastMessage.snippet }} />} />
      <ListItemText className={classes.dateTimeDisplay} secondary={<Moment fromNow>{new Date(thread.lastMessage.receivedAt)}</Moment>} />

      <div ref={element} />

    </ListItem>
  );
};

export default Thread;
