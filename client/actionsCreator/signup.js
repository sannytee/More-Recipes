import axios from 'axios';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  resetState,
} from '../actions/signupAction';

const URL = 'api/v1';

/**
 * @description - Calls the API to create new User
 * @param  {Object} userDetails
 * @return {Object} dispatch an object
*/
export function signUpAction(userDetails) {
  return (dispatch) => {
    dispatch(signupRequest());
    axios.post(`${URL}/users/signup`, userDetails)
      .then((res) => {
        dispatch(signupSuccess(res.data.message));
      })
      .catch((err) => {
        const { error } = err.response.data;
        dispatch(signupFailure(error));
      });
  };
}

/**
  * @description - calls the action to dispatch resetState action
  *
  * @param  {string} error
  *
  * @return {Object} dispatch an object
  */
export function resetUserError(error) {
  return (dispatch) => {
    dispatch(resetState(error));
  };
}
