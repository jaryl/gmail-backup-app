import React, { useState, useContext, useEffect } from 'react';

import {
  Button,
  Typography,
} from '@material-ui/core';

import { GoogleContext } from '../../../hooks/GoogleContext';

import useMailboxSynchronizer from '../hooks/useMailboxSynchronizer';

const SyncManager = (props) => {
  const [mailboxInfo, setMailboxInfo] = useState();
  const { ready } = useContext(GoogleContext);

  const [state, start, stop] = useMailboxSynchronizer();

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

  if (!ready || !mailboxInfo) return <p>Loading...</p>;
  // TODO: retrieve current user (from AuthContext?)
  if (props.profile.email !== 'jaryl.sim@gmail.com') return <p>Wrong email account...</p>;

  return (<React.Fragment>

    <Typography>{state.messages}/{mailboxInfo.messagesTotal}</Typography>
    <Typography>{state.threads}/{mailboxInfo.threadsTotal}</Typography>

    {(state.status === 'started') && <Button variant="contained" color="secondary" onClick={() => stop()}>Stop Sync</Button>}
    {(state.status === 'stopped') && <Button variant="contained" color="secondary" onClick={() => start()}>Start Sync</Button>}

  </React.Fragment>);
};

export default SyncManager;
