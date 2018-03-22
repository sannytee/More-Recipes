import {
  CHANGE_USER_AUTH,
  LOGOUT_USER
} from './types';
import setToken from '../util/setToken';

/**
  * @description - Change the state of authenticated user

  * @return {Object} dispatches the action type and token details
  */
export function changeAuthAction() {
  return {
    type: CHANGE_USER_AUTH,
    payload: false
  };
}

/**
 * @description - logs the user out of the application
 *
 * @return {Object} dispatches the action type and empty user details
 */
export function logoutAction() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setToken(false);
    dispatch({
      type: LOGOUT_USER,
      user: {},
    });
  };
}
