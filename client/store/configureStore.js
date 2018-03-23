import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducers from '../reducers';

/**
 * @description - creates the store
 *
 * @param  {Object} initialState
 *
 * @return {Object} store
*/
export default function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
