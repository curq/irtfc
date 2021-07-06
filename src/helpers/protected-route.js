import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          // if user is logged in, proceed to the page
          return React.cloneElement(children, { user });
        }

        if (!user) {
          // if user is not logged, redirect to the dashboard
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
