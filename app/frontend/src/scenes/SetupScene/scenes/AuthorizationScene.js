import React, { useContext } from 'react';

import { GoogleLogin } from 'react-google-login';

import { SetupContext } from '../hooks/SetupContext';

const AuthorizationScene = () => {
  const { clientId, login } = useContext(SetupContext);

  const handleSuccess = (response) => {
    login(response.tokenObj, response.profileObj);
  };

  const handleFailure = (response) => {
    console.log(response);
  };

  return (
  <GoogleLogin
    clientId={clientId}
    buttonText='Login'
    scope='profile email https://www.googleapis.com/auth/gmail.readonly'
    onSuccess={handleSuccess}
    onFailure={handleFailure}
    cookiePolicy={'single_host_origin'}
    theme='dark'
    // isSignedIn={true}
  />
  );
};

export default AuthorizationScene;
