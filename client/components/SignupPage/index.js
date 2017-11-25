import React from 'react';
import Header from './header';
import Form from './form';
import Footer from '../common/footer';
import img from '../../public/images/banner-img-2.jpg';


/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
class SignupPage extends React.Component {

  componentDidMount() {
    document.body.style.backgroundImage = `url(${img}`;
  }
  render() {
    return (
      <div>
        <Header/>
        <Form/>
        <Footer/>
      </div>         
    );
  }
}

export default SignupPage;