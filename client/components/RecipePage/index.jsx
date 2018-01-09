/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/header';
import Footer from '../common/footer';
import RecipeCardGrid from './recipeCardGrid';
import PopularRecipeCardList from './popularRecipeCardList';
import { getAllRecipesAction,
  getPopularRecipesAction,
} from '../../actions/recipesAction';

/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
class RecipePage extends Component {
  componentWillMount() {
    this.props.actions.getAllRecipesAction();
    this.props.actions.getPopularRecipesAction();
  }

  render() {
    const {
      popularRecipes,
    } = this.props;
    return (
      <div>
        <Header/>
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

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
    popularRecipes: state.recipes.popularRecipes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllRecipesAction,
      getPopularRecipesAction,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
