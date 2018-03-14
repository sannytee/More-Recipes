import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  signUpAction,
  resetUserError,
} from '../../actionsCreator/signup';
import mockData from '../__mocks__/actions/auth';

import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  RESET_USER_ERROR,
  CREATE_USER_FAILURE
} from '../../actions/types';

const user = {
  password: 'test',
  username: 'tester',
  email: 'tester@gmail.com',
};


const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Signup Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch CREATE_USER and CREATE_USER_SUCCESS action when sign up is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: mockData.Response,
      });
    });
    const expectedActions = [
      {
        type: CREATE_USER,
        authenticated: false
      },
      {
        type: CREATE_USER_SUCCESS,
        payload: 'Account created',
        authenticated: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(signUpAction(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch CREATE_USER and CREATE_USER_FAILURE when sign up failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.signupError
      });
    });

    const expectedActions = [
      {
        type: CREATE_USER,
        authenticated: false
      },
      {
        type: CREATE_USER_FAILURE,
        payload: mockData.signupError.error,
        authenticated: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(signUpAction(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch resetState action to clear error ', () => {
    const error = '';
    const expectedActions = [
      {
        type: RESET_USER_ERROR,
        payload: error,
        authenticated: false
      }
    ];
    const store = mockStore({});
    store.dispatch(resetUserError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
