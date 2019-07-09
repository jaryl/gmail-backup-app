import React, { useState } from 'react';

const SetupContext = React.createContext();

const SetupContextProvider = ({
  clientId,
  ...props
}) => {
  const [setupState, setSetupState] = useState({});
  const [ready, setReady] = useState(false);
  // const [mailboxData, setMailboxData] = useState();

  const start = () => {
    console.log('Google API is ready.');
    setReady(true);
  };

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

  const isAuthenticated = () => !!setupState.token;

  const values = {
    clientId,
    login,
    logout,
    profile: setupState.profile,
    token: setupState.token,
    isAuthenticated,
    ready,
  };

  return (
    <SetupContext.Provider value={values} {...props}>
      {props.children}
    </SetupContext.Provider>
  );
};

export { SetupContext, SetupContextProvider };
