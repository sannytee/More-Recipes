import React from 'react';
import Header from '../common/header';
import RecipeCardGrid from './recipeCardGrid';
import PopularRecipeCardList from './popularRecipeCardList';



/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
class RecipePage extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="content">
          <div className="container cont_area">
            <div className="row">
              <RecipeCardGrid/>
              <PopularRecipeCardList/>
            </div>
          </div>
        </div>
      </div>         
    );
  }
}

export default RecipePage;