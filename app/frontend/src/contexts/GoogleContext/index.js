import React, { useState } from 'react';

const GoogleContext = React.createContext();

const GoogleContextProvider = ({
  clientId,
  ...props
}) => {
  const [setupState, setSetupState] = useState({});
  const [ready, setReady] = useState(false);

  const start = () => setReady(true);

  const login = (token, profile) => {
    setSetupState({
      token,
      profile,
    });
    window.gapi.load('client', start);
  };

  const logout = () => {
    setSetupState({});
  };

  const handleLoginResponse = (response) => {
    login(response.tokenObj, response.profileObj);
  };

  const isAuthenticated = () => !!setupState.token;

  const values = {
    clientId,
    handleLoginResponse,
    login,
    logout,
    profile: setupState.profile,
    token: setupState.token,
    isAuthenticated,
    ready,
  };

  return (
    <GoogleContext.Provider value={values} {...props}>
      {props.children}
    </GoogleContext.Provider>
  );
};

export { GoogleContext, GoogleContextProvider };
