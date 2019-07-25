import React from 'react';

import {
  TextField,
  InputAdornment,
  List,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import Thread from './components/thread';

const EmailListing = ({ threads, mailboxIndex }) => {
  const listItems = threads.map(thread => <Thread key={thread.id} thread={thread} mailboxIndex={mailboxIndex} />);

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
