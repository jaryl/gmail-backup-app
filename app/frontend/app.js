import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

import LoginScene from './src/scenes/LoginScene';
import MailScene from './src/scenes/MailScene';
import SettingsScene from './src/scenes/SettingsScene';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MailScene} />
        <Route path="/login" component={LoginScene} />
        <Route path="/settings" component={SettingsScene} />
      </Switch>
    </Router>
   );
}

ReactDOM.render(<App />, document.querySelector('#app'));
