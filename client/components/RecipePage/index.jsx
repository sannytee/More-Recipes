/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/header';
import RecipeCardGrid from './recipeCardGrid';
import PopularRecipeCardList from './popularRecipeCardList';
import getAllRecipesAction from '../../actions/recipesAction';

/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
class RecipePage extends React.Component {
  componentWillMount() {
    this.props.actions.getAllRecipesAction();
  }

  render() {
    const { recipes } = this.props;
    return (
      <div>
        <Header/>
        <div className="content">
          <div className="container cont_area">
            <div className="row">
              <RecipeCardGrid allRecipes={recipes}/>
              <PopularRecipeCardList/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllRecipesAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
