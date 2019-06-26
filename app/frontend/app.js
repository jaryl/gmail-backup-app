import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContextProvider } from './src/contexts/AuthContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';

import AuthService from './src/services/AuthService';
import LocalStorageService from './src/services/LocalStorageService';

const App = () => {
  const authContextProviderProps = {
    authenticate: AuthService.call,
    token: LocalStorageService.retrieve('authToken'),
  };

  return (
    <MainErrorBoundary>
      <AuthContextProvider {...authContextProviderProps}>
        <Router>
          <Switch>
            <Route path="/login" render={props => <LoginScene {...props} />} />
            <AuthenticatedRoute path="/" render={props => <MailScene {...props} />} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </MainErrorBoundary>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
