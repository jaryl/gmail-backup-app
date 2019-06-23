import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';
import MainErrorBoundary from './src/components/MainErrorBoundary';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';

const App = () => {
  const authContext = useContext(AuthContext);

  return (
    <MainErrorBoundary>
      <AuthContextProvider>
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
