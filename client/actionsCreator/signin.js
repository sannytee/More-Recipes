import axios from 'axios';
import jwt from 'jsonwebtoken';
import setToken from '../util/setToken';
import {
  signinFailure,
  signinSuccess,
  signinRequest
} from '../actions/signinAction';

const URL = 'api/v1';

/**
  * @description - Calls the API to signin registered user
  * @param  {Object} userDetails
  * @return {Object} dispatches the action type and token details
*/
export default function signinAction(userDetails) {
  return (dispatch) => {
    dispatch(signinRequest());
    return axios.post(`${URL}/users/signin`, userDetails)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        const user = jwt.decode(token);
        dispatch(signinSuccess(user));
      })
      .catch((err) => {
        const { error } = err.response.data;
        dispatch(signinFailure(error));
      });
  };
}
