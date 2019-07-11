import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../hooks/AuthContext';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ loggedIn }) => <Route
      {...rest}
      render={props => (loggedIn ? (
        rest.render(props)
      ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
      ))
      }
    />
    }
  </AuthContext.Consumer>
);

export default AuthenticatedRoute;
