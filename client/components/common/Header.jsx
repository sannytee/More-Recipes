import React from 'react';
import { Link } from 'react-router';


const Header = () => (
  <header>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2b3034' }}>
      <a className="navbar-brand" href="/">More-Recipes</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span className="nav-link">Viewing as Guest</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Create an account</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
