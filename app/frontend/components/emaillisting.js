import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField, InputAdornment, Typography, Badge, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  avatar: {
    minWidth: '16px',
  }
}));

export default function EmailListing(props) {
  const classes = useStyles();

  return (
    <div>
      <TextField fullWidth
        id="outlined-search"
        type="search"
        margin="none"
        variant="filled"
        InputProps={{
          ariaLabel: 'Search',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <List component="nav">

        <ListItem button alignItems="start" key={0} divider={true}>
          <ListItemAvatar className={classes.avatar}>
            <Badge color="primary" variant="dot"></Badge>
          </ListItemAvatar>
          <ListItemText primary="Hello world" secondary="This is great lorem ipsum sit amet dolor" />
        </ListItem>

        <ListItem button alignItems="start" key={1} divider={true}>
          <ListItemAvatar className={classes.avatar}>
            <Badge color="primary" variant="dot"></Badge>
          </ListItemAvatar>
          <ListItemText primary="Hello world" secondary="This is great lorem ipsum sit amet dolor" />
        </ListItem>

      </List>
    </div>
  );
};
