/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { signUpAction } from '../../actions/authAction';
import Header from './header.jsx';
import Form from './form.jsx';
import Footer from '../common/footer.jsx';
import img from '../../public/images/banner-img-2.jpg';


/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
class SignupPage extends React.Component {
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

  /* eslint-disable class-methods-use-this */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${img}`;
  }

  onFocus(event) {    
    const { name } = event.target;
    switch (name) {
      case 'username':
        this.setState({ usernameError: '' });
        break;
      case 'email':
        this.setState({ emailError: '' });
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: '', });
        break;
      default:
        return this.state;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signUpAction(this.state)
      .then(() => {
        toastr.success('Account successfully created ');
        this.context.router.push('/signin');
      })
      .catch((err) => {
        const { data } = err.response;
        switch (data.error) {
          case 'This username already exist':
            this.setState({
              usernameError: data.error
            });
            break;
          case 'This email already exists':
            this.setState({
              emailError: data.error
            });
            break;
          case 'Password does not match':
            this.setState({
              confirmPasswordError: data.error
            });
            break;
          case 'Username must be greater than 5':
            this.setState({
              usernameError: data.error
            });
            break;
          default:
            this.setState({
              error: data.error
            });
        }
      });
  }

  onChange(event) {
    const { name } = event.target,
      { value } = event.target;
    this.setState({
      [name]: value
    });
  }

  

  render() {
    return (
      <div>
        <Header/>
        <Form
          value={this.state}
          onFocus={this.onFocus}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}/>
        <Footer/>
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signUpAction
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignupPage);
