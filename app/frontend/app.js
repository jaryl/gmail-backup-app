import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

import { AuthContextProvider } from './src/contexts/AuthContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';

import AuthService from './src/services/AuthService';
import LocalStorageService from './src/services/LocalStorageService';

import apolloConnect from './config/apolloConnect';

let client = apolloConnect(LocalStorageService.get('authToken'));

AuthService.use(client);

const App = () => {
  const authContextProviderProps = {
    authService: AuthService,
    initialLoggedIn: !!LocalStorageService.get('authToken'),
    onLogin: (token) => {
      LocalStorageService.set('authToken', token);
      client = apolloConnect(token);
      AuthService.use(client);
    },
    onLogout: () => {
      LocalStorageService.remove('authToken');
    },
  };

  return (
    <MainErrorBoundary>
      <ApolloProvider client={client}>
        <AuthContextProvider {...authContextProviderProps}>
          <Router>
            <Switch>
              <Route path="/login" render={props => <LoginScene {...props} />} />
              <AuthenticatedRoute path="/" render={props => <MailScene {...props} />} />
            </Switch>
          </Router>
        </AuthContextProvider>
      </ApolloProvider>
    </MainErrorBoundary>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
