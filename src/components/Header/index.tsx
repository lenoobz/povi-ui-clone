import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { QuickSelect } from 'components/QuickSelect';
import logo from 'assets/images/stock.png';
import { routes } from 'routes';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { UserDetails } from 'types';
import { Avatar } from 'components/Avatar';
import { deleteJwtToken, deleteUserDetails } from 'api/fundAPI';

type HeaderProps = {
  userDetails?: UserDetails;
  onClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ userDetails, onClick }) => {
  const onClickSupport = () => {
    const url = 'https://ko-fi.com/X7X45F5DY';
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  };

  const navLinks = routes.map((r, i) => {
    if (!r.showOnNav) {
      return null;
    }

    return (
      <NavLink key={i} activeClassName="header-nav-link-actived" className="w3-hide-small header-nav-link" to={r.path}>
        {r.name}
      </NavLink>
    );
  });

  const actions = userDetails ? (
    <div className="w3-dropdown-hover header-action">
      <div className="header-profile">
        <Avatar src={userDetails.picture} name={userDetails.name} />
      </div>
      <div className="w3-dropdown-content w3-bar-block w3-card w3-round header-action-dropdown">
        <span className="w3-bar-item w3-button" onClick={onClickSupport}>
          Support
        </span>
        <span
          className="w3-bar-item w3-button"
          onClick={() => {
            Auth.signOut();
            deleteJwtToken();
            deleteUserDetails();
          }}
        >
          Logout
        </span>
      </div>
    </div>
  ) : (
    <div
      className="header-action"
      onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
    >
      Login
    </div>
  );

  return (
    <div className="w3-card page-header">
      <div className="header-logo">
        <button className="w3-button w3-hide-large w3-hide-medium" style={{ paddingRight: '30px' }} onClick={onClick}>
          <i className="fa fa-bars"></i>
        </button>
        <Link className="w3-hide-small" to="/">
          <img src={logo} alt="Logo" height="38px" />
        </Link>
      </div>
      <div className="header-nav">
        <div className="header-nav-links">{navLinks}</div>
        <QuickSelect />
      </div>
      <div className="header-actions">{actions}</div>
    </div>
  );
};
