import React, { useState, useReducer, useEffect } from 'react';

import GoogleApiService from '../../services/GoogleApiService';

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

const defaultScope = 'profile email https://www.googleapis.com/auth/gmail.readonly';

const GoogleContextProvider = ({ clientId, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [scope] = useState(defaultScope);
  const [api, setApi] = useState();

  useEffect(() => {
    let didCancel = false;

    const onApiLoaded = () => {
      if (!didCancel) dispatch({ type: 'load' });
    };

    if (window.gapi) window.gapi.load('client', onApiLoaded);

    return () => { didCancel = true; };
  }, [window.gapi]);

  useEffect(() => {
    if (state.ready) {
      setApi(new GoogleApiService(window.gapi.client));
    } else {
      setApi(null);
    }
  }, [state.ready]);

  const handleLoginResponse = response => dispatch({ type: 'login', payload: response });
  const handleLogoutResponse = () => dispatch({ type: 'logout' });

  const values = {
    clientId,
    scope,
    handleLoginResponse,
    handleLogoutResponse,
    profile: state.profile,
    token: state.token,
    ready: state.ready, // TODO: remove this, just check if api is available
    isAuthenticated: !!state.token,
    api,
  };

  return (
    <GoogleContext.Provider value={values} {...props}>
      {props.children}
    </GoogleContext.Provider>
  );
};

export { GoogleContext, GoogleContextProvider };
