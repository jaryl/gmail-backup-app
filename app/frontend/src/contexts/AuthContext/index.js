import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = ({ authenticate, token, ...props }) => {
  const [authToken, setAuthToken] = useState(token);

  const handleLogin = async (params) => {
    const { token: newToken } = await authenticate(params);
    setAuthToken(newToken);
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  const values = {
    authToken: authToken || token,
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
