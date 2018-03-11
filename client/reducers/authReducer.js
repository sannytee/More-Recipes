import {
  CHANGE_USER_AUTH,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  SIGN_USER,
  SIGN_USER_FAILURE,
  SIGN_USER_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  RESET_USER_ERROR,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  authenticated: false,
  user: {
    username: ''
  },
  response: '',
  error: null,
  profile: {},
  isLoading: false
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
    case GET_USER_DATA:
      return { ...state, isLoading: action.isLoading };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        profile: action.payload
      };
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          image: action.payload.user.image
        }
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default authReducer;
