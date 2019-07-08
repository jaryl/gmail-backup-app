import React from 'react';

import clientId from '../../../config/oauth';

import { SetupContextProvider, SetupContext } from './hooks/SetupContext';

import AuthorizationScene from './scenes/AuthorizationScene';
import MailboxViewScene from './scenes/MailboxViewScene';

const SetupScene = () => {
  return (
    <React.Fragment>
      <SetupContextProvider clientId={clientId}>
        <SetupContext.Consumer>
          {({ isAuthenticated }) => (isAuthenticated() ? <MailboxViewScene /> : <AuthorizationScene />)}
        </SetupContext.Consumer>
      </SetupContextProvider>
    </React.Fragment>
  );
};


export default SetupScene;
