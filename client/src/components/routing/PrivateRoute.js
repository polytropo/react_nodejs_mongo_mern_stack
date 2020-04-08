import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Take the component out and anything that is rest (because we don't know what else is in there?)
// wecheck if user is not authenticated, then we will redirect. But otherwise load the component
const PrivateRoute = ({ component: Component, auth: { loading, isAuthenticated }, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
