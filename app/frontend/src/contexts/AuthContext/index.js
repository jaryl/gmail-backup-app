import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false); // TODO: expand on state to include user info
  const [errorMessage, setErrorMessage] = useState(null);

  const values = {
    loggedIn,
    login: ({ username, password }) => { // TODO: move into auth service
      if (username === "admin" && password === "123123123") {
        setLoggedIn(true);
        // TODO: store access token locally
      } else {
        setErrorMessage('Your username or password is incorrect');
      }
    },
    logout: () => {
      setLoggedIn(false);
      setErrorMessage(null);
    },
    errorMessage,
  };

  return (
    <AuthContext.Provider value={values} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
