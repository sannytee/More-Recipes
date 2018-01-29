/* eslint-disable no-unused-vars */
/**
 *  @fileOverview Creates the homepage for users
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 *  @requires     NPM:react-redux
 *  @requires     NPM:redux
 *  @requires     NPM:jsonwebtoken
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';
import Header from '../common/header';
import AuthHeader from '../common/authHeader';
import Footer from '../common/footer';
import RecipeCardGrid from './recipeCardGrid';
import PopularRecipeCardList from './popularRecipeCardList';
import { getAllRecipesAction,
  getPopularRecipesAction,
} from '../../actions/recipesAction';
import { changeAuthAction } from '../../actions/authAction';

/**
 * @description A class to represent the recipe page
 *
 * @extends Component
 */
class RecipePage extends Component {
  /**
   * @memberof RecipePage
   * @returns {void}
  */
  componentWillMount() {
    this.props.actions.getAllRecipesAction();
    this.props.actions.getPopularRecipesAction();
  }

  /**
   * @description return navbar based on if user is authenticated
   *
   * @memberof RecipePage
   *
   * @returns {void} returns navbar
  */
  checkUserState() {
    let notValid;
    const token = localStorage.getItem('token');
    if (this.props.isauthenticated === false) {
      return <Header/>;
    }
    if (this.props.isauthenticated === true) {
      jwt.verify(token, 'andelabootcampproject', (error) => {
        if (error) {
          localStorage.removeItem('token');
          this.props.actions.changeAuthAction();
          notValid = true;
        } else {
          notValid = false;
        }
      });
      if (notValid === true) {
        return <Header/>;
      }
      if (notValid === false) {
        return <AuthHeader user={this.props.user}/>;
      }
    }
  }

  /**
   * @memberof RecipePage
   *
   * @returns {void} returns the component to be mounted
  */
  render() {
    const {
      popularRecipes,
    } = this.props;
    return (
      <div>
        {
          this.checkUserState()
        }
        <div className="content">
          <div className="container cont_area">
            <div className="row">
              <RecipeCardGrid
              allRecipes={this.props.recipes}
              upvoteAction={this.upvoteRecipe}
              />
              <PopularRecipeCardList popularRecipes={popularRecipes}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/**
 * @description maps state to properties of RecipePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be bind
 */
function mapStateToProps(state) {
  return {
    isauthenticated: state.auth.authenticated,
    user: state.auth.user,
    recipes: state.recipes.recipes,
    popularRecipes: state.recipes.popularRecipes,
  };
}

/**
 * @description maps action to properties of authHeader
 *
 * @param  {dispatch} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllRecipesAction,
      getPopularRecipesAction,
      changeAuthAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
