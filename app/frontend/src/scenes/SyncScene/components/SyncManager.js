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
  const { ready } = useContext(GoogleContext);

  const [state, start] = useMessageSynchronizer(mailbox);

  useEffect(() => {
    let didCancel = false;

    if (ready) {
      window.gapi.client.request({ path: 'https://www.googleapis.com/gmail/v1/users/me/profile' })
        .then((response) => {
          if (!didCancel) setMailboxInfo(response.result);
        });
    }

    return () => { didCancel = true; };
  }, [ready]);

  if (!ready || !mailboxInfo || !mailbox) return <p>Loading...</p>;

  if (profile.email !== mailbox.email) return <p>Wrong email account...</p>;

  return (<React.Fragment>

    <Typography>{state.messages}/{mailboxInfo.messagesTotal}</Typography>

    {(state.status === 'pending') && <Button variant="contained" color="secondary" onClick={() => start()}>Start Sync</Button>}
    {(state.status === 'stopped') && <Button variant="contained" color="primary" component={Link} to={{ pathname: '/0' }}>Go to Mailbox</Button>}

  </React.Fragment>);
};

export default SyncManager;
