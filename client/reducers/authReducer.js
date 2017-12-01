import {  CREATE_USER } from '../actions/types';

const initialState = {
  user: '',
  profile: {
    username: '',
    email: '',
  }
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return state;
    default:
      return state;
  }
}

export default authReducer;
