import React from 'react';
import { Redirect, Route } from 'react-router';
import { loadJwtToken } from 'api/fundAPI';

type PublicRouteProps = {
  path: string;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, ...rest }) => {
  const jwtToken = loadJwtToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !jwtToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
