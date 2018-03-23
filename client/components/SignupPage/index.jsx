import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import {
  signUpAction,
  resetUserError
} from '../../actionsCreator/signup';
import Header from './Header';
import Form from './Form';
import Footer from '../common/Footer';
import img from '../../public/images/banner-img-2.jpg';


const defaultProps = {
  response: null,
  error: null
};


/**
 * @description A class to display the signup page
 *
 * @extends Component
 */
export class SignupPage extends Component {
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
      confirmPassword: '',
      error: '',
      confirmPasswordError: '',
      usernameError: '',
      emailError: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   * @description performs DOM manipulation right after the component mount
   *
   * @memberof SignupPage
   *
   * @returns {void}
  */
  componentDidMount() {
    document.body.style.backgroundImage = `url(${img}`;
  }

  /**
   * @description performs an action when component receives props
   *
   * @memberof SignupPage
   *
   * @param {object} nextProps
   *
   * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    const { response, error } = nextProps;
    if (response === 'Account created') {
      toastr.success('Account successfully created');
      this.context.router.push('/signin');
    } else {
      switch (error) {
        case 'This username already exist':
          this.setState({
            usernameError: error
          });
          break;
        case 'Username is required':
          this.setState({
            usernameError: error
          });
          break;
        case 'This email already exists':
          this.setState({
            emailError: error
          });
          break;
        case 'Password does not match':
          this.setState({
            confirmPasswordError: error
          });
          break;
        case 'Username must be greater than 5':
          this.setState({
            usernameError: error
          });
          break;
        default:
          this.setState({
            error
          });
      }
    }
  }

  /**
   * @description removes errorMessage when focused
   *
   * @param {object} event
   *
   * @memberof SignupPage
   *
   * @returns {void}
  */
  onFocus(event) {
    const { name } = event.target;
    const error = '';
    switch (name) {
      case 'username':
        this.setState({ usernameError: '' });
        this.props.actions.resetUserError(error);
        break;
      case 'email':
        this.setState({ emailError: '' });
        this.props.actions.resetUserError(error);
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: '', });
        this.props.actions.resetUserError(error);
        break;
      default:
        return this.state;
    }
  }

  /**
   * @description listen for changes in the form
   *
   * @param {object} event
   *
   * @memberof SignupPage
   *
   * @returns {void}
  */
  onChange(event) {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description handles the submission of form
   *
   * @param {object} event
   *
   * @memberof SignupPage
   *
   * @returns {void}
  */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signUpAction(this.state);
  }

  /**
   * @description renders the components
   *
   * @memberof SignupPage
   *
   * @returns {void} returns the components
  */
  render() {
    return (
      <div>
        <Header />
        <Form
          value={this.state}
          onFocus={this.onFocus}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
        />
        <Footer />
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object
};

SignupPage.propTypes = {
  response: PropTypes.string,
  error: PropTypes.string,
  actions: PropTypes.shape({
    resetUserError: PropTypes.func,
    signUpAction: PropTypes.func
  }).isRequired
};

SignupPage.defaultProps = defaultProps;

/**
 * @description maps state to properties of MyRecipePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    response: state.auth.response,
    error: state.auth.error
  };
}

/**
 * @description maps action to properties of MyRecipePage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signUpAction,
      resetUserError
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
