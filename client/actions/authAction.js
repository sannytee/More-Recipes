/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setToken from '../util/setToken';
import { CREATE_USER, SIGN_USER } from './types';

const URL = 'http://localhost:3000/api/v1';

/**
  * @description - Calls the API to create new User
  * @param  {Object} userDetails
  * @return {Object} dispatch an object
  */
export function signUpAction(userDetails) {
  return dispatch => axios.post(`${URL}/users/signup`, userDetails)
    .then((res) => {
      dispatch({
        type: CREATE_USER,
        user: res.data
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
  * @description - Calls the API to signin registered user
  * @param  {Object} userDetails
  * @return {Object} dispatches the action type and token details
  */
export function signinAction(userDetails) {
  return dispatch => axios.post(`${URL}/users/signin`, userDetails)
    .then((res) => {
      const { token } = res.data;
      /* eslint-disable no-undef */
      localStorage.setItem('token', token);
      setToken(token);
      dispatch({
        type: SIGN_USER,
        user: jwt.decode(token)
      });
    })
    .catch((err) => {
      throw (err);
    });
}
