import React from 'react';

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

import { Search as SearchIcon, ContactSupportOutlined } from '@material-ui/icons';

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

const emailHeaders = [
  {
    id: 'ccc76246-dccb-4725-b179-225bfaa3fca0',
    sender: 'Charles Parrish',
    title: 'Meet at the Met?',
    lead: 'Hey Eden, Looking forward to seeing you and the gang Saturday night...',
    datetime: '15:32 AM',
  },
  {
    id: '4a0196ae-9e7e-4fc7-8b70-ab381f3630ba',
    sender: 'Sarah Castelblanco',
    title: 'Not the same without you',
    lead: 'I just walked by your old cube and looked to see if you were in there...',
    datetime: '13 May',
  },
];

const EmailListing = ({ match }) => {
  const classes = useStyles();

  const listItems = emailHeaders.map(item => <ListItem button className={classes.listItem} divider={true} component={Link} key={item.id} to={{ pathname: `/${match.params.label}/${item.id}`}}>
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
