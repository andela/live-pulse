import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './Dashboard';

export default () => {
  return (
    <Router>
      <Route exact path="/" component={SignIn} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  )
}
