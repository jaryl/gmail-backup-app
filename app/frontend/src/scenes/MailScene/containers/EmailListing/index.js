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

import { PresentationContext } from '../../hooks/PresentationContext';

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

const EmailListing = () => {
  const classes = useStyles();

  const {
    selectedLabel,
    selectedThread,
    selectThread,
    mailCache,
  } = useContext(PresentationContext);

  const { getThread, getLabel } = mailCache;

  const emailHeaders = getLabel(selectedLabel).map(id => getThread(id));

  const listItems = emailHeaders.map(item => <ListItem
    button
    className={classes.listItem}
    divider={true}
    key={item.id}
    selected={selectedThread === item.id}
    onClick={() => selectThread(selectedLabel, item.id)}
    component={Link}
    to={{ pathname: `/${selectedLabel}/${item.id}` }}
    replace={true}
  >
      <ListItemAvatar className={classes.avatar}>
        <Badge color="primary" variant="dot"><React.Fragment /></Badge>
      </ListItemAvatar>
    <ListItemText primary={item.sender} secondary={item.title} />
    <ListItemText className={classes.dateTimeDisplay} secondary={item.datetime} />
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
