import React from 'react';

import clientId from '../../../config/oauth';

import { SetupContextProvider } from './hooks/SetupContext';

import AuthorizationScene from './scenes/AuthorizationScene';
import MailboxViewScene from './scenes/MailboxViewScene';

const SetupScene = () => {
  return (
    <React.Fragment>
      <SetupContextProvider clientId={clientId}>
        <AuthorizationScene />
        <MailboxViewScene />
      </SetupContextProvider>
    </React.Fragment>
  );
};

export default SetupScene;
