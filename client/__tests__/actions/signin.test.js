import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import signinAction from '../../actionsCreator/signin';
import mockData from '../__mocks__/actions/auth';
import mockLocalStorage from '../__mocks__/localStorage';
import {
  SIGN_USER,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
} from '../../actions/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Signin Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SIGN_USER and SIGN_USER_SUCCESS when signin is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.SigninResponse
      });
    });

    const expectedActions = [
      {
        type: SIGN_USER,
        authenticated: false
      },
      {
        type: SIGN_USER_SUCCESS,
        payload: mockData.SigninSuccessResponse,
        authenticated: true
      },
    ];

    const store = mockStore({});
    return store.dispatch(signinAction(mockData.UserDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch  SIGN_USER_FAILURE when signin failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.SigninError
      });
    });

    const expectedActions = [
      {
        type: SIGN_USER,
        authenticated: false
      },
      {
        type: SIGN_USER_FAILURE,
        payload: mockData.SigninError.error,
        authenticated: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(signinAction(mockData.UserDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
