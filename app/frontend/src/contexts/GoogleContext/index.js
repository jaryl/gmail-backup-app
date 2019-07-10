import React, { useReducer, useEffect } from 'react';

const GoogleContext = React.createContext();

const initialState = {
  token: null,
  profile: null,
  ready: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        token: action.payload.tokenObj,
        profile: action.payload.profileObj,
      };
    case 'logout':
      return {
        ...state,
        token: null,
        profile: null,
      };
    case 'load':
      return {
        ...state,
        ready: true,
      };
    default:
      throw new Error('invalid dispatch');
  }
};

const GoogleContextProvider = ({ clientId, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!window.gapi) return;
    const onApiLoaded = () => dispatch({ type: 'load' });
    window.gapi.load('client', onApiLoaded);
  }, [window.gapi]);

  const handleLoginResponse = response => dispatch({ type: 'login', payload: response });
  const handleLogoutResponse = () => dispatch({ type: 'logout' });

  const values = {
    clientId,
    handleLoginResponse,
    handleLogoutResponse,
    profile: state.profile,
    token: state.token,
    ready: state.ready,
    isAuthenticated: !!state.token,
  };

  return (
    <GoogleContext.Provider value={values} {...props}>
      {props.children}
    </GoogleContext.Provider>
  );
};

export { GoogleContext, GoogleContextProvider };
