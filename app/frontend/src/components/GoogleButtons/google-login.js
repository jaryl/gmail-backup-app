import React, { useContext } from 'react';

import { GoogleLogin as OriginalGoogleLogin } from 'react-google-login';

import { GoogleContext } from '../../hooks/GoogleContext';

const GoogleLogin = (props) => {
  const {
    clientId,
    scope,
    handleLoginResponse,
    profile,
  } = useContext(GoogleContext);

  const googleRenderlessDisplay = renderProps => <div {...renderProps} />;

  return (
    <OriginalGoogleLogin
      clientId={clientId}
      buttonText='Sign in with Google'
      scope={scope}
      onSuccess={handleLoginResponse}
      onFailure={handleLoginResponse}
      cookiePolicy={'single_host_origin'}
      theme='dark'
      prompt='consent'
      isSignedIn={true}
      render={profile ? googleRenderlessDisplay : null}
      {...props}
    />
  );
};

export default GoogleLogin;
