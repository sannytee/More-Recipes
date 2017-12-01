import React from 'react';
import img from '../../public/images/burger-image.jpg';


/* eslint-disable no-unused-vars */
const Form = (props) => {
  return (
    <div className="container">
      <div className="pt-5" style={{ textAlign: 'center' }}>
        <form className="m-x-auto form card">
          <h1 className="signin-text"> More-Recipes</h1>
          <div>
            <img src={img}
              name="image"
              className="img-fluid rounded-circle img-size"/>
          </div>
          <div className="pb-4 pt-3 form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              required
              placeholder="Username"/>
          </div>
          <div className="pb-4 form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              required
              placeholder="Password"/>
          </div>
          <button
            type="submit"
            className="btn signin-btn btn-lg"
            style={{ color: '#f2b43c' }}>
              Log in
          </button>
          <p> Don’t have an account?
            <a href="/signup">Create an account.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
