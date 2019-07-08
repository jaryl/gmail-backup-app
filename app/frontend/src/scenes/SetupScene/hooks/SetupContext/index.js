import React, { useState } from 'react';

const SetupContext = React.createContext();

const SetupContextProvider = ({
  clientId,
  ...props
}) => {
  const [setupState, setSetupState] = useState({});
  // const [mailboxData, setMailboxData] = useState();

  const login = (token, profile) => {
    setSetupState({
      token,
      profile,
    });
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
  };

  return (
    <SetupContext.Provider value={values} {...props}>
      {props.children}
    </SetupContext.Provider>
  );
};

export { SetupContext, SetupContextProvider };
