import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  RESET_USER_ERROR
} from './types';


/**
 * @description - action dispatch when request is first made
 *
 * @param  {Object} userDetails
 *
 * @return {Object} dispatch an object
*/
export const signupRequest = () => ({
  type: CREATE_USER,
  authenticated: false
});

/**
 * @description - action to dispatch  when request is successful
 *
 * @param  {string} response
 *
 * @return {Object} dispatch an object
*/
export const signupSuccess = response => ({
  type: CREATE_USER_SUCCESS,
  payload: response,
  authenticated: false
});

/**
 * @description - action to dispatch when requset failed
 *
 * @param  {string} error
 *
 * @return {Object} dispatch an object
 */
export const signupFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error,
  authenticated: false,
});


/**
  * @description - action to reset the error
  *
  * @param  {string} error
  *
  * @return {Object} dispatch an object
  */
export const resetState = error => ({
  type: RESET_USER_ERROR,
  payload: error,
  authenticated: false
});
