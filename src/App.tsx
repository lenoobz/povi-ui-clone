import React from 'react';
import Amplify from 'aws-amplify';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { GlobalProvider } from 'stores/providers/GlobalProvider';
import { globalReducer } from 'stores/reducers/GlobalReducer';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { MainLayout } from 'layouts/Main';
import { amplifyConfig } from 'configs/aws.config';
import { routes, RouteType } from 'routes';
import './styles/w3.css';
import './styles/w3-theme-green.css';
import './styles/w3-custom.css';

Amplify.configure(amplifyConfig);

const App: React.FC = () => {
  return (
    <GlobalProvider reducer={globalReducer}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            {routes.map((route, i) => {
              if (route.type === RouteType.PRIVATE) {
                return (
                  <PrivateRoute key={i} path={route.path}>
                    <route.component />
                  </PrivateRoute>
                );
              }

              return (
                <PublicRoute key={i} path={route.path}>
                  <route.component />
                </PublicRoute>
              );
            })}
            <Redirect from="/" to="/portfolios" />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
