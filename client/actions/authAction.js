import axios from 'axios';
import { CREATE_USER } from './types';

const URL = 'http://localhost:3000/api/v1';

/* eslint-disable require-jsdoc */
export default function signUpAction(userDetails) {
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
