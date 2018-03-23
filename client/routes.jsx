import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LandingPage from './components/LandingPage';
import SigninPage from './components/SigninPage';
import SignupComponent from './components/SignupPage';
import recipes from './components/RecipePage';
import myRecipePage from './components/MyRecipePage';
import recipeDetailsPage from './components/RecipeDetailsPage';
import FavoriteRecipePage from './components/MyFavoriteRecipePage';
import ProfilePage from './components/ProfilePage';
import checkUserState from './middlewares/checkUserState';
import NotFound from './components/common/notFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="signup" component={SignupComponent} />
    <Route path="recipes" component={recipes} />
    <Route path="/my-recipes" component={checkUserState(myRecipePage)} />
    <Route path="recipes/:recipeId" component={checkUserState(recipeDetailsPage)} />
    <Route path="/my-favorite" component={checkUserState(FavoriteRecipePage)} />
    <Route path="/my-profile" component={checkUserState(ProfilePage)} />
    <Route path="*" component={NotFound} />
  </Route>
);
