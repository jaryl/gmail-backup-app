import React, { useEffect, useRef, useContext } from 'react';

import {
  TextField,
  InputAdornment,
  List,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import Thread from './components/thread';

import { ScrollContext } from '../../../../hooks/ScrollContext';

const EmailListing = ({ onLoadMore, pageInfo, edges, mailboxIndex }) => {
  const { rootRef } = useContext(ScrollContext);

  const lastElement = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (e[0].isIntersecting && pageInfo.endCursor === e[0].target.dataset.cursor) onLoadMore();
    };

    const observer = new IntersectionObserver(callback, {
      root: rootRef.current,
      threshold: 1.0,
    });

    if (lastElement.current) observer.observe(lastElement.current);

    return () => observer.disconnect();
  }, [pageInfo, edges]);

  const listItems = edges.map(edge => (
    <Thread
      key={edge.cursor} // TODO: investigate why can't use thread id as key
      cursor={edge.cursor}
      thread={edge.node}
      mailboxIndex={mailboxIndex}
      ref={lastElement}
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
