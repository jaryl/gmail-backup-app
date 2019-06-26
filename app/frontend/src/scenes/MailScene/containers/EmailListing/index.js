import React from 'react';

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

        <ListItem button className={classes.listItem} key={0} divider={true}>
          <ListItemAvatar className={classes.avatar}>
            <Badge color="primary" variant="dot"><React.Fragment /></Badge>
          </ListItemAvatar>
          <ListItemText primary="Lorem ipsum sit amet dolor" secondary="This is great lorem ipsum sit amet dolor" />
          <ListItemText className={classes.dateTimeDisplay} secondary="15:32" />
        </ListItem>

        <ListItem button className={classes.listItem} key={1} divider={true}>
          <ListItemAvatar className={classes.avatar}>
            <Badge color="primary" variant="dot"><React.Fragment /></Badge>
          </ListItemAvatar>
          <ListItemText primary="Lorem ipsum sit amet dolor" secondary="This is great lorem ipsum sit amet dolor" />
          <ListItemText className={classes.dateTimeDisplay} secondary="13 May" />
        </ListItem>

      </List>
    </div>
  );
};

export default EmailListing;
