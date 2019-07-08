import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = ({
  authService,
  initialLoggedIn,
  onLogin,
  onLogout,
  ...props
}) => {
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  const handleLogin = async (params) => {
    const { token: newToken } = await authService.authenticate(params);
    onLogin(newToken);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    onLogout();
    setLoggedIn(false);
  };

  const injectToken = (newToken) => {
    onLogin(newToken);
    setLoggedIn(true);
  };

  const values = {
    loggedIn,
    login: handleLogin,
    logout: handleLogout,
    injectToken,
  };

  return (
    <AuthContext.Provider value={values} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
