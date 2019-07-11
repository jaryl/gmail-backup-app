import React, { useContext } from 'react';

import { GoogleLogout as OriginalGoogleLogout } from 'react-google-login';

import { GoogleContext } from '../../contexts/GoogleContext';

const GoogleLogout = (props) => {
  const { clientId, handleLogoutResponse } = useContext(GoogleContext);

  return (
    <OriginalGoogleLogout
      clientId={clientId}
      buttonText='Logout'
      onLogoutSuccess={handleLogoutResponse}
      {...props}
    />
  );
};

export default GoogleLogout;
