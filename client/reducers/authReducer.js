import {
  CHANGE_USER_AUTH,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  SIGN_USER,
  SIGN_USER_FAILURE,
  SIGN_USER_SUCCESS,
  RESET_USER_ERROR
} from '../actions/types';

const initialState = {
  authenticated: false,
  user: {
    username: ''
  },
  error: null,
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
      return {
        ...state,
        authenticated: action.authenticated
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        authenticated: action.authenticated
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        authenticated: action.authenticated
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        authenticated: action.authenticated
      };
    case SIGN_USER:
      return {
        ...state,
        authenticated: action.authenticated
      };
    case SIGN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authenticated: action.authenticated
      };
    case SIGN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        authenticated: action.authenticated
      };
    case CHANGE_USER_AUTH:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}

export default authReducer;
