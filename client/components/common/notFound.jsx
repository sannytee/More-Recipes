import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';


const NotFound = () => (
  <div>
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
              <Link className="nav-link navbar-brand" to="/recipes">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div className="container main">
      <div className="pt-5 main-div" style={{ textAlign: 'center' }}>
        <img
          src="http://clipartmag.com/images/oops-emoticon-17.jpg"
          name="image"
          alt="error"
          className="img-fluid rounded-circle"
        />
        <h1>Page Not Found</h1>
        <div >
          <Link id="remove-link" className="vote-button errorBtn" to="/recipes">Go Back</Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
