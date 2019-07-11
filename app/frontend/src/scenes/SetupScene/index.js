import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../hooks/AuthContext';

import AuthorizationScene from './scenes/AuthorizationScene';
import MailboxSetupScene from './scenes/MailboxSetupScene';

const SetupScene = (props) => {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) return <Redirect to={{ pathname: '/app', state: { from: props.location } }} />;

  return (
    <React.Fragment>
      <AuthorizationScene />
      <MailboxSetupScene />
    </React.Fragment>
  );
};

export default SetupScene;
