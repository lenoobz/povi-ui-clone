import { Breakdowns } from 'views/Breakdowns';
import { Dividends } from 'views/Dividends';
import { Portfolios } from 'views/Portfolios';
import { SignUp } from 'views/SignUp';

export enum RouteType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export type AppRoute = {
  name: string;
  path: string;
  showOnNav: boolean;
  type: RouteType;
  component: React.ComponentType;
};

export const routes: AppRoute[] = [
  {
    name: 'SignUp',
    path: '/signup',
    showOnNav: false,
    component: SignUp,
    type: RouteType.PUBLIC
  },
  {
    name: 'Portfolios',
    path: '/portfolios',
    showOnNav: true,
    component: Portfolios,
    type: RouteType.PRIVATE
  },
  {
    name: 'Breakdowns',
    path: '/breakdowns',
    showOnNav: true,
    component: Breakdowns,
    type: RouteType.PRIVATE
  },
  {
    name: 'Dividends',
    path: '/dividends',
    showOnNav: true,
    component: Dividends,
    type: RouteType.PRIVATE
  }
];
