/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import img from '../../public/images/burger-image.jpg';

const propTypes = {
  error: PropTypes.shape({
    error: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  error: null
};

const Form = props => (
  <div className="container">
    <div className="pt-5" style={{ textAlign: 'center' }}>
      <form className="m-x-auto form card" onSubmit={props.onSubmit}>
        <h1 className="signin-text"> More-Recipes</h1>
        <div>
          <img
            src={img}
            name="image"
            className="img-fluid rounded-circle img-size"
            alt="logo"
          />
        </div>
        {
          props.error.error &&
          <div className="alert alert-danger">
            {props.error.error}
          </div>
        }
        <div className="pb-4 pt-3 form-group">
          <input
            type="text"
            name="username"
            onFocus={props.onFocus}
            onChange={props.onChange}
            className="form-control"
            required
            placeholder="Username or Email"
          />
        </div>
        <div className="pb-4 form-group">
          <input
            type="password"
            name="password"
            onFocus={props.onFocus}
            onChange={props.onChange}
            className="form-control"
            required
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn signin-btn btn-lg"
          style={{ color: '#f2b43c' }}
        >
          Log in
        </button>
        <p> Don’t have an account?
          <a href="/signup">Create an account.</a>
        </p>
      </form>
    </div>
  </div>
);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
