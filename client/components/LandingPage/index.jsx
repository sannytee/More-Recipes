import React from 'react';
import Header from './header';
import Carousel from './carousel';
import AboutSection from './aboutSection';
import Footer from '../common/footer';


/* eslint-disable react/prefer-stateless-function */

/**
 * @description A class to mount all components related to LandingPage
 *
 * @extends Component
 */
class LandingPage extends React.Component {
  /**
   * @description renders the components
   *
   * @memberof LandingPage
   *
   * @returns {JSX} returns the components
  */
  render() {
    return (
      <div>
        <Header />
        <Carousel />
        <AboutSection />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
