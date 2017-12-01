/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router';


const Header = (props) => {
  return (
    <header>
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
          <form className="form-inline my-2 my-lg-0 ml-auto ">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"/>
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/:userId/recipe">My Recipes</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Signout</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
