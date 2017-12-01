/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LandingPage from './components/LandingPage/index';
import SigninPage from './components/SigninPage/index';
import SignupPage from './components/SignupPage/index';
import recipes from './components/RecipePage/index';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='signin' component={SigninPage} />
    <Route path='signup' component={SignupPage}/>
    <Route path='recipes' component={recipes} />
    <Route path='recipes/:recipeId' />
    <Route path='users/:userId/profile'/>
    <Route path='users/:userId/recipe'/>
  </Route>
);
