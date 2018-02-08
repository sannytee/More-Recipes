import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  RESET_USER_ERROR
} from '../actions/types';

const initialState = {
  authenticated: '',
  user: {
    username: ''
  },
  response: '',
  error: ''
};

/**
  * @description - modifies the state based on action type
  * @param  {Object} state
  * @param  {Object} action
  * @return {Object} returns a new state
  */
function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        response: action.payload,
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
    default:
      return state;
  }
}

export default signupReducer;
