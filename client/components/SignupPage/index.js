import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import signUpAction  from '../../actions/authAction';
import Header from './header';
import Form from './form';
import Footer from '../common/footer';
import img from '../../public/images/banner-img-2.jpg';


/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      confirmPasswordError: '',
      usernameError: '',
      emailError: '',
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    document.body.style.backgroundImage = `url(${img}`;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signUpAction(this.state)
      .then(() => {
        toastr.success('Account successfully created ');
        toastr.success('Proceed to login');
      })
      .catch(err => {
        const data = err.response.data;
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
            break
          case 'Username must be greater than 5':
            this.setState({
              usernameError: data.error
            });
            break
          default:
            this.setState({
              error: data.error
            });
        }
      });
  }

  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  
  render() {
    return (
      <div>
        <Header/>
        <Form
          value={this.state}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}/>
        <Footer/>
      </div>         
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      signUpAction
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SignupPage);