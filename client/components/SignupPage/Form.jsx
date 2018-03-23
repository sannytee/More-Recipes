import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.shape({
    usernameError: PropTypes.string,
    emailError: PropTypes.string,
    confirmPasswordError: PropTypes.string,
  }),
};

const defaultProps = {
  value: null
};

const Form = props => (
  <div className="container">
    <div className="pt-5" style={{ textAlign: 'center' }}>
      <form className="m-x-auto form card" onSubmit={props.handleSubmit}>
        <h1 className="signin-text">More-Recipes</h1>
        <div className="pb-4 pt-3 form-group">
          <input
            type="text"
            name="username"
            className="form-control"
            required
            onChange={props.onChange}
            onFocus={props.onFocus}
            placeholder="Username"
          />
          {
            props.value.usernameError &&
            <div className="alert alert-danger">
              {
                props.value.usernameError
              }
            </div>
          }
        </div>
        <div className="pb-4 form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            required
            onFocus={props.onFocus}
            onChange={props.onChange}
            placeholder="Email"
          />
          {
            props.value.emailError &&
            <div className="alert alert-danger">
              {
                props.value.emailError
              }
            </div>
          }
        </div>
        <div className="pb-4 form-group">
          <input
            type="password"
            id="pass"
            name="password"
            pattern=".{7,12}"
            title="7 to 12 characters"
            className="form-control"
            required
            onFocus={props.onFocus}
            onChange={props.onChange}
            placeholder="Password"
          />
        </div>
        <div className="pb-4 form-group">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            required
            onFocus={props.onFocus}
            onChange={props.onChange}
            placeholder="Confirm Password"
          />
          {
            props.value.confirmPasswordError &&
            <div className="alert alert-danger">
              {
                props.value.confirmPasswordError
              }
            </div>
          }
        </div>
        <button type="submit" className="btn signin-btn btn-lg" style={{ color: '#f2b43c' }}>
          Create Account
        </button>
        <div className="form-group">
          <p>
            Already have an account? <a href="/signin">Log in.</a>
          </p>
        </div>
      </form>
    </div>
  </div>
);
Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
