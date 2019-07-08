import React, { useContext } from 'react';

import { GoogleLogout } from 'react-google-login';

import { SetupContext } from '../hooks/SetupContext';

const MailboxViewScene = () => {
  const { clientId, logout } = useContext(SetupContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <p>Backing up...</p>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      ></GoogleLogout>
    </React.Fragment>
  );
};

export default MailboxViewScene;
