import expect from 'expect';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  signUpAction,
  resetUserError,
} from '../../actionsCreator/signup';
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  RESET_USER_ERROR
} from '../../actions/types';

const user = {
  password: 'test',
  username: 'tester',
  email: 'tester@gmail.com',
};

const response = {
  message: 'Account created'
};
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Signup Actions', () => {
  it('should dispatch CREATE_USER, CREATE_USER_SUCCESS action and sign user', () => {
    fetchMock.post('/api/v1/users/signup', {
      status: 200,
      body: JSON.stringify(user)
    });

    const expectedActions = [
      {
        type: CREATE_USER,
        authenticated: false
      },
      {
        type: CREATE_USER_SUCCESS,
        payload: response,
        authenticated: false
      }
    ];

    const store = mockStore({});
    store.dispatch(signUpAction(user))
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
