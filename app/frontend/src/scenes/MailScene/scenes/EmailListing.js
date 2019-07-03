import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputAdornment,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import { PresentationContext } from '../hooks/PresentationContext';

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

const EmailListing = ({ threads }) => {
  const classes = useStyles();

  const { selectedLabel, selectedThread, selectThread } = useContext(PresentationContext);

  const listItems = threads.map(thread => <ListItem
    button
    className={classes.listItem}
    divider={true}
    key={thread.id}
    selected={selectedThread && selectedThread.id === thread.id}
    onClick={() => selectThread(thread.id)}
    component={Link}
    to={{ pathname: `/${selectedLabel.slug}/${thread.id}` }}
    replace={true}
  >
    <ListItemAvatar className={classes.avatar}>
      <Badge color="primary" variant="dot"><React.Fragment /></Badge>
    </ListItemAvatar>
    <ListItemText primary={thread.sender} secondary={thread.snippet} />
    <ListItemText className={classes.dateTimeDisplay} secondary={thread.datetime} />
  </ListItem>);

  return (
    <div>
      <TextField fullWidth
        id="outlined-search"
        type="search"
        margin="none"
        variant="filled"
        InputProps={{
          'aria-label': 'Search',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <List component="nav">
        {listItems}
      </List>
    </div>
  );
};

export default EmailListing;
