import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import SignIn from './components/auth/SignIn';
import Dashboard from './Dashboard';

const history = createBrowserHistory();

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}
