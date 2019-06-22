import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false); // TODO: expand on state to include user info

  const values = {
    loggedIn,
    login: (username, password) => { setLoggedIn(true) }, // TODO: use auth service
    logout: () => { setLoggedIn(false) },
  };

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
