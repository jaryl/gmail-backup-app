import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = ({ authenticate, localStorageService, ...props }) => {
  const initialToken = localStorageService.get('authToken');
  const [authToken, setAuthToken] = useState(initialToken);

  const handleLogin = async (params) => {
    const { token: newToken } = await authenticate(params);
    setAuthToken(newToken);
    localStorageService.set('authToken', newToken);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorageService.clear('authToken');
  };

  const values = {
    authToken: authToken || initialToken,
    loggedIn: !!authToken,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
