import expect from 'expect';
import AuthReducer from '../../reducers/authReducer';
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
  RESET_USER_ERROR
} from '../../actions/types';

const initialState = {
  authenticated: false,
  user: {
    username: ''
  },
  error: null,
  profile: {},
  isLoading: false
};

describe('Auth Reducer', () => {
  it('should return default state when no action type is passed', () => {
    const action = {
      type: ''
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.isLoading).toEqual(false);
    expect(newState.profile).toEqual({});
  });

  it('should return  default state when no state is passed', () => {
    const action = {
      type: '',
    };
    const newState = AuthReducer(undefined, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.isLoading).toEqual(false);
    expect(newState.profile).toEqual({});
  });

  it('should set authenticated when  CREATE_USER is passed', () => {
    const action = {
      type: CREATE_USER,
      authenticated: false
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
  });

  it('should set authenticated and payload when CREATE_USER_SUCCESS is passed', () => {
    const action = {
      type: CREATE_USER_SUCCESS,
      authenticated: false,
      payload: 'Account created'
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.response).toEqual('Account created');
    expect(newState.authenticated).toEqual(false);
  });

  it('should set error  when CREATE_USER_FAILURE is passed', () => {
    const action = {
      type: CREATE_USER_FAILURE,
      authenticated: false,
      payload: 'User already exist'
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.error).toEqual('User already exist');
    expect(newState.authenticated).toEqual(false);
  });

  it('should set error when RESET_USER_ERROR is passed', () => {
    const action = {
      type: RESET_USER_ERROR,
      authenticated: false,
      payload: ''
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.error).toEqual('');
    expect(newState.authenticated).toEqual(false);
  });

  it('should set authenticated when SIGN_USER is passed', () => {
    const action = {
      type: SIGN_USER,
      authenticated: false,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
  });

  it('should set authenticated and user when SIGN_USER_SUCCESS is passed', () => {
    const action = {
      type: SIGN_USER_SUCCESS,
      payload: {
        id: 1,
        username: 'sannytee',
        iat: 1520699071,
        exp: 1520713471,
      },
      authenticated: true,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(true);
    expect(newState.user.id).toEqual(1);
    expect(newState.user.username).toEqual('sannytee');
  });

  it('should set authenticated when and error SIGN_USER_FAILURE is passed', () => {
    const action = {
      type: SIGN_USER_FAILURE,
      payload: 'invalid credentials',
      authenticated: false,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.error).toEqual('invalid credentials');
  });

  it('should change authenticated when CHANGE_USER_AUTH is passed', () => {
    const action = {
      type: CHANGE_USER_AUTH,
      payload: false,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
  });
  it('should set error and authenticated when RESET_USER_ERROR is passed', () => {
    const action = {
      type: RESET_USER_ERROR,
      payload: '',
      authenticated: false,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.error).toEqual('');
    expect(newState.authenticated).toEqual(false);
  });
  it('should set isLoading when GET_USER_DATA is passed', () => {
    const action = {
      type: GET_USER_DATA,
      isLoading: true,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('should set isLoading and profile when GET_USER_DATA_SUCCESS is passed', () => {
    const action = {
      type: GET_USER_DATA_SUCCESS,
      payload: {
        id: 1,
        username: 'sannytee',
        email: 'tester@test.com',
        createdAt: '2018-02-19T15:54:05.322Z'
      },
      isLoading: false
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.profile.id).toEqual(1);
    expect(newState.profile.username).toEqual(action.payload.username);
    expect(newState.profile.email).toEqual(action.payload.email);
  });

  it('should set isLoading and error when GET_USER_DATA_FAILURE is passed', () => {
    const action = {
      type: GET_USER_DATA_FAILURE,
      isLoading: false,
      payload: 'Network error'
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.error).toEqual(action.payload);
  });
});
