import React, { useEffect, useRef, useContext } from 'react';

import {
  TextField,
  InputAdornment,
  List,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import Thread from './components/thread';

import { ScrollContext } from '../../../../hooks/ScrollContext';

const EmailListing = ({ onLoadBefore, onLoadAfter, pageInfo, edges, mailboxIndex }) => {
  const { rootRef } = useContext(ScrollContext);

  const firstElement = useRef(null);
  const lastElement = useRef(null);

  const lastCursor = useRef(null);

  useEffect(() => {
    const callback = ([entry]) => {
      if (!entry.isIntersecting) return;
      switch (entry.target.dataset.cursor) {
        case firstElement.current.dataset.cursor:
          if (lastCursor.current !== firstElement.current.dataset.cursor) {
            onLoadAfter();
            lastCursor.current = firstElement.current.dataset.cursor;
            rootRef.current.scrollTop = 200;
          }
          break;
        case lastElement.current.dataset.cursor:
          if (lastCursor.current !== lastElement.current.dataset.cursor) {
            onLoadBefore();
            lastCursor.current = lastElement.current.dataset.cursor;
          }
          break;
        default:
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: rootRef.current,
      threshold: 1.0,
    });

    observer.observe(firstElement.current);
    observer.observe(lastElement.current);

    return () => observer.disconnect();
  }, [pageInfo, edges]);

  const listItems = edges.map((edge, index) => {
    let ref = null;
    if (index === 0) {
      ref = firstElement;
    } else if (index === edges.length - 1) {
      ref = lastElement;
    }

    return (
      <Thread
        key={edge.cursor} // TODO: investigate why can't use thread id as key
        cursor={edge.cursor}
        thread={edge.node}
        mailboxIndex={mailboxIndex}
        ref={ref}
      />
    );
  });

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
