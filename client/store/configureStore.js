import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      /* eslint-disable no-undef */
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
