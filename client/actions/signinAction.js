import {
  SIGN_USER,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
} from './types';

/**
 * @description - action dispatch when request is first made
 *
 * @param  {Object} userDetails
 *
 * @return {Object} dispatch an object
 */
export const signinRequest = () => ({
  type: SIGN_USER,
  authenticated: false,
});

/**
 * @description - action to dispatch  when request is successful
 *
 * @param  {string} response
 *
 * @return {Object} dispatch an object
 */
export const signinSuccess = response => ({
  type: SIGN_USER_SUCCESS,
  payload: response,
  authenticated: true
});

/**
 * @description - action to dispatch when requset failed
 *
 * @param  {string} error
 *
 * @return {Object} dispatch an object
 */
export const signinFailure = error => ({
  type: SIGN_USER_FAILURE,
  payload: error,
  authenticated: false
});
