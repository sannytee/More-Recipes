/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Header from './header';
import Carousel from './carousel';
import AboutSection from './aboutSection';
import Footer from '../common/footer';

/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
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
