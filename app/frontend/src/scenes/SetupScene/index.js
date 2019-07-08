import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import clientId from '../../../config/oauth';

import { AuthContext } from '../../contexts/AuthContext';
import { SetupContextProvider } from './hooks/SetupContext';

import AuthorizationScene from './scenes/AuthorizationScene';
import MailboxSetupScene from './scenes/MailboxSetupScene';

const SetupScene = (props) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <React.Fragment>

      { loggedIn && <Redirect to={{ pathname: '/app', state: { from: props.location } }} />}

      <SetupContextProvider clientId={clientId}>
        <AuthorizationScene />
        <MailboxSetupScene />
      </SetupContextProvider>

    </React.Fragment>
  );
};

export default SetupScene;
