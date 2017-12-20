/* eslint-disable no-unused-vars */
import React from 'react';
import RecipeCard from './recipeCard';

const recipeCardGrid = props => (
  <div className="col-lg-9 col-md-12">
    <div className="row">
      <div className="col-md-12">
        <div className="line small">
          <h2>Recipes</h2>
        </div>
      </div>
    </div>
    <div className="row">
    {
      props.allRecipes.map(recipes => (
          <RecipeCard
            recipeName={recipes.recipeName}
            upvotes={recipes.upvotes}
            downvotes={recipes.downvotes}
          />
        ))
    }
    </div>
  </div>
);

export default recipeCardGrid;
