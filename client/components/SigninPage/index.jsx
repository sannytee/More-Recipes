import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Header from './header.jsx';
import Form from './form.jsx';
import Footer from '../common/footer.jsx';
import img from '../../public/images/banner-img-2.jpg';
import signinAction from '../../actionsCreator/signin';
import { resetUserError } from '../../actionsCreator/signup';

/* eslint-disable react/no-unused-state */

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  actions: PropTypes.shape({
    resetUserError: PropTypes.func,
    signinAction: PropTypes.func,
  }).isRequired
};

const defaultProps = {
  error: null,
};

/**
 * @description A class to display the signin page
 *
 * @extends Component
 */
class SigninPage extends Component {
  /**
   * enables action to the performed on this component
   *
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   * @description performs DOM manipulation right before the component mount
   *
   * @memberof SigninPage
   *
   * @returns {void}
  */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${img}`;
    if (this.props.authenticated === true) {
      this.context.router.push('/recipes');
    }
  }

  /**
   * @description performs an action when component receives props
   *
   * @memberof SigninPage
   *
   * @param {object} nextProps
   *
   * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    const { authenticated, error } = nextProps;
    if (authenticated === true) {
      toastr.success('Login successfull');
      this.context.router.push('/recipes');
    } else {
      this.setState({
        error,
      });
    }
  }


  /**
   * @description performs action after the component unmount
   *
   * @memberof SigninPage
   *
   * @returns {void}
  */
  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  /**
   * @description listen for changes in the form
   *
   * @param {object} event
   *
   * @memberof SigninPage
   *
   * @returns {void}
  */
  onChange(event) {
    const { name } = event.target,
      { value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description removes errorMessage when focused
   *
   * @param {object} event
   *
   * @memberof SigninPage
   *
   * @returns {void}
  */
  onFocus(event) {
    const { name } = event.target;
    const error = '';
    switch (name) {
      case 'username':
        this.setState({ error: '' });
        this.props.actions.resetUserError(error);
        break;
      case 'password':
        this.setState({ error: '' });
        this.props.actions.resetUserError(error);
        break;
      default:
        return this.state;
    }
  }

  /**
   * @description handles the submission of form
   *
   * @param {object} event
   *
   * @memberof SigninPage
   *
   * @returns {void}
  */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signinAction(this.state);
  }

  /**
   * @description renders the components
   *
   * @memberof SigninPage
   *
   * @returns {void} returns the components
  */
  render() {
    return (
      <div>
        <Header />
        <Form
          error={this.state}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onSubmit={this.handleSubmit}
        />
        <Footer />
      </div>
    );
  }
}

SigninPage.contextTypes = {
  router: PropTypes.object
};

SigninPage.propTypes = propTypes;
SigninPage.defaultProps = defaultProps;

/**
 * @description maps state to properties of SigninPage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
}

/**
 * @description maps action to properties of SigninPage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signinAction,
      resetUserError
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
