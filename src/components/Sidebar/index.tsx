import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

type SidebarProps = {
  isOpened: boolean;
  onClose?: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpened, onClose, children }) => {
  const display = isOpened ? 'block' : 'none';

  const navLinks = [];
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].showOnNav) {
      continue;
    }

    const link = (
      <li key={i} className="w3-border-0" style={{ padding: '0 8px' }} onClick={onClose}>
        <NavLink
          activeClassName="w3-theme-l1"
          className="w3-bar-item w3-button w3-padding w3-ripple w3-hover-pale-green"
          to={routes[i].path}
        >
          {routes[i].name}
        </NavLink>
      </li>
    );

    navLinks.push(link);
  }

  return (
    <>
      <nav className="w3-sidebar w3-white w3-animate-left" style={{ zIndex: 3, width: '300px', display: display }}>
        <br />
        <div className="w3-bar-block">
          <ul className="w3-ul">{navLinks}</ul>
        </div>
      </nav>
      <div
        className="w3-overlay w3-animate-opacity"
        style={{ cursor: 'pointer', display: display }}
        title="close side menu"
        onClick={onClose}
      ></div>
    </>
  );
};
