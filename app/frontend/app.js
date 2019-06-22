import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';

import AuthenticatedRoute from './src/components/AuthenticatedRoute';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';

const App = () => {
  const authContext = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login" render={props => <LoginScene {...props} />} />
          <AuthenticatedRoute path="/" render={props => <MailScene {...props} />} />
        </Switch>
      </Router>
    </AuthContextProvider>
   );
}

ReactDOM.render(<App />, document.querySelector('#app'));
