import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = ({ authenticate, token, ...props }) => {
  const [authToken, setAuthToken] = useState(token);

  const handleLogin = (params) => {
    return authenticate(params).then(({ token }) => { // return to support promise chaining
      setAuthToken(token);
    });
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  const values = {
    authToken: authToken || token,
    loggedIn: authToken ? true : false,
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
