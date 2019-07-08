import React, { useState } from 'react';

const SetupContext = React.createContext();

const SetupContextProvider = ({
  clientId,
  ...props
}) => {
  const [tokenObj, setTokenObj] = useState();
  const [profileObj, setProfileObj] = useState();

  // const [mailboxData, setMailboxData] = useState();

  const login = (token, profile) => {
    setProfileObj(profile);
    setTokenObj(token);
  };

  const logout = () => {
    setTokenObj(null);
    setProfileObj(null);
  };

  const isAuthenticated = () => !!tokenObj;

  const values = {
    clientId,
    login,
    logout,
    profileObj,
    isAuthenticated,
  };

  return (
    <SetupContext.Provider value={values} {...props}>
      {props.children}
    </SetupContext.Provider>
  );
};

export { SetupContext, SetupContextProvider };
