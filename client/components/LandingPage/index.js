import React from 'react';
import Header from './header';
import Carousel from './carousel';
import AboutSection from './aboutSection';
import Footer from '../common/footer';

/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Carousel/>
        <AboutSection/>
        <Footer/>
      </div>
      
    );
  }
}

export default LandingPage;