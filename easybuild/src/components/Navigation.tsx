import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          EasyBuild
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/builder"
            className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
          >
            PC Builder
          </Link>
          <Link
            to="/glossary"
            className={`nav-link ${isActive('/glossary') ? 'active' : ''}`}
          >
            Glossary
          </Link>
          <Link
            to="/admin"
            className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
          >
            Admin
          </Link>
        </div>

        <Link to="/builder" className="nav-cta">
          Start Building
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
