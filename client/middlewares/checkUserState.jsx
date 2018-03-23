import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { logoutAction } from '../actions/signoutAction';
import verifyUser from '../util/verifyUser';

const propTypes = {
  actions: PropTypes.shape({
    logoutAction: PropTypes.func,
  }).isRequired
};


/**
 * @description  checks if the user is authenticated before rendering component
 *
 * @param {jsx} ComposedComponent
 *
 * @returns {void} returns the component
*/
export default function checkUserState(ComposedComponent) {
  /**
   * @description authenticate components
   * @extends Component
  */
  class Authenticate extends Component {
    /**
     * @memberof authenticate
     * @returns {void}
    */
    componentWillMount() {
      if (verifyUser() === false) {
        this.props.actions.logoutAction();
        toastr.error('Login to continue');
        return this.context.router.push('/');
      }
    }

    /**
     * @memberof authenticate
     *
     * @returns {void}
    */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = propTypes;

  Authenticate.contextTypes = {
    router: PropTypes.object
  };

  /**
   * @description maps action to properties of authenticate
   *
   * @param  {dispatch} dispatch
   *
   * @returns {object} returns the action to be bind
   */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        logoutAction
      }, dispatch)
    };
  }

  return connect(null, mapDispatchToProps)(Authenticate);
}

