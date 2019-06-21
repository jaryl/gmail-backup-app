import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

import Login from './src/scenes/Login';
import MailClient from './src/scenes/MailClient';
import Settings from './src/scenes/Settings';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MailClient} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
   );
}

ReactDOM.render(<App />, document.querySelector('#app'));
