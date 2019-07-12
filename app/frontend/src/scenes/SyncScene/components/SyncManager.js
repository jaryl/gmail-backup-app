import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  Button,
  Typography,
} from '@material-ui/core';

import { GoogleContext } from '../../../hooks/GoogleContext';

import useMessageSynchronizer from '../hooks/useMessageSynchronizer';

const SyncManager = ({ profile, mailbox }) => {
  const [mailboxInfo, setMailboxInfo] = useState();
  const { ready, api } = useContext(GoogleContext);

  const [state, start] = useMessageSynchronizer(mailbox);

  useEffect(() => {
    let didCancel = false;

    (async function doQuery() {
      if (api) {
        const { result } = await api.getProfile();
        if (!didCancel) setMailboxInfo(result);
      }
    }());

    return () => { didCancel = true; };
  }, [api]);

  if (!ready || !mailboxInfo || !mailbox) return <p>Loading...</p>;

  if (profile.email !== mailbox.email) return <p>Wrong email account...</p>;

  return (<React.Fragment>

    <Typography>{state.messages}/{mailboxInfo.messagesTotal}</Typography>

    {(state.status === 'pending') && <Button variant="contained" color="secondary" onClick={() => start()}>Start Sync</Button>}
    {(state.status === 'stopped') && <Button variant="contained" color="primary" component={Link} to={{ pathname: '/0' }}>Go to Mailbox</Button>}

  </React.Fragment>);
};

export default SyncManager;
