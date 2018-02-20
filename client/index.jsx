/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'babel-polyfill';
import React from 'react';
import jquery from 'jquery';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import firebase from 'firebase';
import configureStore from './store/configureStore';
import routes from './routes';
import './public/styles/style.scss';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../node_modules/toastr/build/toastr.min.css';
import { SIGN_USER_SUCCESS } from './actions/types';
import setToken from './util/setToken';
import config from './util/firebaseConfig';

firebase.initializeApp(config);
const store = configureStore();

if (localStorage.token) {
  setToken(localStorage.token);
  store.dispatch({
    type: SIGN_USER_SUCCESS,
    payload: jwt.decode(localStorage.token),
    authenticated: true,
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
