import React from 'react';

import {
  TextField,
  InputAdornment,
  List,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import Thread from './components/thread';

const EmailListing = ({ onLoadMore, pageInfo, edges, mailboxIndex }) => {
  const checkIfLastCursor = (cursor) => {
    if (pageInfo.endCursor === cursor) onLoadMore();
  };

  const listItems = edges.map(edge => (
    <Thread
      key={edge.cursor}
      cursor={edge.cursor}
      thread={edge.node}
      mailboxIndex={mailboxIndex}
      checkIfLastCursor={checkIfLastCursor}
    />
  ));

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default EmailListing;
