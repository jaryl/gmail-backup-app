import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';

const FakeAuthenticationService = { // TODO: move this into an actual authentication service
  call: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      if (username === "admin" && password === "123123123") {
        resolve({ token: 'some-random-token' });
      } else {
        reject({ message: 'Please check your username and password' });
      }
    });
  }
}

const LocalStorageService = { // TODO: move this into an actual local storage service
  /*
  retrieve: (key) => null,
  /*/
  retrieve: (key) => 'some-token-value-for-testing',
  //*/
}

const App = () => {
  const authContextProviderProps = {
    authenticate: FakeAuthenticationService.call,
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
}

ReactDOM.render(<App />, document.querySelector('#app'));
