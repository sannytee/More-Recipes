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
      props.allRecipes.map((recipe, i) => (
          <RecipeCard
            key={i}
            i={i}
            id={recipe.id}
            recipeName={recipe.recipeName}
            upvotes={recipe.upvotes}
            downvotes={recipe.downvotes}
          />
        ))
    }
    </div>
  </div>
);

export default recipeCardGrid;
