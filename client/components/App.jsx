/* eslint-disable react/prefer-stateless-function */
import React, { PropTypes } from 'react';


const propTypes = {
  children: PropTypes.shape().isRequired
};

/**
 * @description A class to mount all component
 *
 * @extends Component
 */
class App extends React.Component {
  /**
   * @memberof App
   *
   * @returns {void} returns the component to be mounted
  */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
