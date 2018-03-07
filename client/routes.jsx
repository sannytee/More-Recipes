import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LandingPage from './components/LandingPage/index';
import SigninPage from './components/SigninPage/index';
import SignupPage from './components/SignupPage/index';
import recipes from './components/RecipePage/index';
import myRecipePage from './components/MyRecipePage/index';
import recipeDetailsPage from './components/RecipeDetailsPage/index';
import FavoriteRecipePage from './components/MyFavoriteRecipePage/index';
import ProfilePage from './components/ProfilePage/index';
import checkUserState from './middlewares/checkUserState';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="recipes" component={recipes} />
    <Route path="/my-recipes" component={checkUserState(myRecipePage)} />
    <Route path="recipes/:recipeId" component={checkUserState(recipeDetailsPage)} />
    <Route path="/my-favorite" component={checkUserState(FavoriteRecipePage)} />
    <Route path="/my-profile" component={checkUserState(ProfilePage)} />
  </Route>
);
