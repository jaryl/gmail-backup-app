import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

import clientId from './config/oauth';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { GoogleContextProvider, GoogleContext } from './src/contexts/GoogleContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';
import SetupScene from './src/scenes/SetupScene';
import SyncScene from './src/scenes/SyncScene';

import AuthService from './src/services/AuthService';
import LocalStorageService from './src/services/LocalStorageService';

import apolloConnect from './config/apolloConnect';

const client = apolloConnect(() => LocalStorageService.get('authToken'));

AuthService.use(client);

const App = () => {
  if (!AuthService.verify(LocalStorageService.get('authToken'))) LocalStorageService.remove('authToken');

  const authContextProviderProps = {
    authService: AuthService,
    initialLoggedIn: !!LocalStorageService.get('authToken'),
    onLogin: (token) => {
      LocalStorageService.set('authToken', token);
      client.clearStore();
    },
    onLogout: () => {
      LocalStorageService.remove('authToken');
      client.clearStore();
    },
  };

  return (
    <MainErrorBoundary>
      <ApolloProvider client={client}>
        <AuthContextProvider {...authContextProviderProps}>
          <GoogleContextProvider clientId={clientId}>
            <Router>
              <Switch>
                <Route path="/login" render={props => <LoginScene {...props} />} />
                <Route path="/setup" render={props => <SetupScene {...props} />} />
                <AuthenticatedRoute path="/sync" render={props => <SyncScene {...props} />} />
                <AuthenticatedRoute path="/" render={props => <MailScene {...props} />} />
              </Switch>
            </Router>
          </GoogleContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </MainErrorBoundary>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
