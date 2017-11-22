import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './public/styles/style.scss';
import '../node_modules/bootstrap/scss/bootstrap.scss';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);
