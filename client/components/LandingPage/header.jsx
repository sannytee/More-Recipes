/* eslint-disable no-unused-vars */
import React from 'react';

const Header = props => (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2b3034' }}>
        <a className="navbar-brand" href="#">More-Recipes</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/signin">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">Sign up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#About">About us</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
);

export default Header;
