import { CREATE_USER, SIGN_USER, CHANGE_USER_AUTH } from '../actions/types';

const initialState = {
  authenticated: false,
  user: '',
  profile: {
    username: '',
    email: '',
  }
};


/**
  * @description -modifies the state based on action type
  * @param  {Object} state
  * @param  {Object} action
  * @return {Object} returns a new state
  */
function authReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.user };
    case SIGN_USER:
      return { ...state, user: action.user, authenticated: true };
    case CHANGE_USER_AUTH:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}

export default authReducer;
