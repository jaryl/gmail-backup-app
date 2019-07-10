import React, { useState } from 'react';

import {
  Button,
  Typography,
} from '@material-ui/core';

import useMailboxSynchronizer from '../hooks/useMailboxSynchronizer';

const SyncManager = (props) => {
  const [mailboxInfo, setMailboxInfo] = useState();

  const [state, start, stop] = useMailboxSynchronizer();

  if (!window.gapi.client) return <p>Loading...</p>;

  window.gapi.client.request({ path: 'https://www.googleapis.com/gmail/v1/users/me/profile' })
    .then((response) => {
      setMailboxInfo(response.result);
    });

  if (!mailboxInfo) return <p>Still loading...</p>;

  return (<React.Fragment>

    <Typography>{state.messages}/{mailboxInfo.messagesTotal}</Typography>
    <Typography>{state.threads}/{mailboxInfo.threadsTotal}</Typography>

    {(state.status === 'started') && <Button variant="contained" color="secondary" onClick={() => stop()}>Stop Sync</Button>}
    {(state.status === 'stopped') && <Button variant="contained" color="secondary" onClick={() => start()}>Start Sync</Button>}

  </React.Fragment>);
};

export default SyncManager;
