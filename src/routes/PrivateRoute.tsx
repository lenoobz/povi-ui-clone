import React from 'react';
import { Redirect, Route } from 'react-router';
import { loadJwtToken } from 'api/fundAPI';

type PrivateRouteProps = {
  path: string;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const jwtToken = loadJwtToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        jwtToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signup',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
