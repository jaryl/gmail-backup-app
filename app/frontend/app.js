import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

import clientId from './config/oauth';

import { GoogleContextProvider } from './src/hooks/GoogleContext';
import { AuthContextProvider } from './src/hooks/AuthContext';
import { MailboxContextProvider } from './src/hooks/MailboxContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';
import SetupScene from './src/scenes/SetupScene';
import SyncScene from './src/scenes/SyncScene';

import AuthService from './src/services/AuthService';

import apolloConnect from './config/apolloConnect';

// localStorage.removeItem('authToken');

const apolloClient = apolloConnect(() => localStorage.getItem('authToken'));

const authService = new AuthService(apolloClient);

const App = () => {
  const authContextProviderProps = {
    authService,
    onLogin: () => apolloClient.cache.reset(),
    onLogout: () => apolloClient.cache.reset(),
  };

  return (
    <MainErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <AuthContextProvider {...authContextProviderProps}>
          <GoogleContextProvider clientId={clientId}>
            <MailboxContextProvider>
              <Router>
                <Switch>
                  <Route path="/login" render={props => <LoginScene {...props} />} />
                  <Route path="/setup" render={props => <SetupScene {...props} />} />
                  <AuthenticatedRoute path="/:mailbox/sync" render={props => <SyncScene {...props} />} />
                  <AuthenticatedRoute path="/:mailbox/" render={props => <MailScene {...props} />} />
                </Switch>
              </Router>
            </MailboxContextProvider>
          </GoogleContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </MainErrorBoundary>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
