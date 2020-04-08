import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// SWITCH can only hve routes in it, so we need to put alert component above it

// loadUser - useeffect, take store directly and then calldispatch - basically when state updates this will keep runing, so it  is like a constant loop of sorts unless when add empty parenthesis at end - [], so it only runs once (then it becomes like component didmount)

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={ Landing } />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
              <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
            </Switch>
          </section>
        </Fragment> 
      </Router>
    </Provider> 
  );
};
   
export default App;
