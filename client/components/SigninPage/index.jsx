/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Header from './header.jsx';
import Form from './form.jsx';
import Footer from '../common/footer.jsx';
import img from '../../public/images/banner-img-2.jpg';
import { signinAction } from '../../actions/authAction';

/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
class SigninPage extends Component {
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

  onChange(event) {
    const { name } = event.target,
      { value } = event.target;
    this.setState({
      [name]: value
    });
  }

  onFocus(event) {
    const { name } = event.target;
    switch (name) {
      case 'username':
        this.setState({ error: '' });
        break;
      case 'password':
        this.setState({ error: '' });
        break;
      default:
        return this.state;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signinAction(this.state)
      .then(() => {
        toastr.success('Login successfull');
        this.context.router.push('/recipes');
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.error
        });
      });
  }

  componentWillMount() {
    document.body.style.backgroundImage = `url(${img}`;
    if (this.props.authenticated === true) {
      this.context.router.push('/recipes');
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  render() {
    return (
      <div>
        <Header />
        <Form
          error={this.state}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onSubmit={this.handleSubmit} />
        <Footer />
      </div>
    );
  }
}

SigninPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signinAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
