import React, { useState, useEffect } from 'react';

const AUTH_TOKEN_KEY = 'authToken';

const AuthContext = React.createContext();

const AuthContextProvider = ({
  authService,
  onLogin,
  onLogout,
  ...props
}) => {
  const initialToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const [token, setToken] = useState(initialToken);

  // update local storage with token (if changed)
  useEffect(() => localStorage.setItem(AUTH_TOKEN_KEY, token), [token]);

  // check if token is expired, and remove if so
  useEffect(() => {
    if (!authService.verify(token)) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
    }
  });

  const values = {
    token,
    loggedIn: !!token,
    login: async (params) => {
      const { token: newToken } = await authService.authenticate(params);
      setToken(newToken);
      onLogin(newToken); // TODO: check if we to pass new token
    },
    logout: () => {
      setToken(null);
      onLogout();
    },
    loginWithToken: (newToken) => {
      setToken(newToken);
      onLogin(newToken); // TODO: check if we to pass new token
    },
  };

  return (
    <AuthContext.Provider value={values} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

console.log(AuthContextProvider);

export { AuthContext, AuthContextProvider };
