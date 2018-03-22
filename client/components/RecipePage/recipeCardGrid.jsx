import React, { PropTypes } from 'react';
import RecipeCard from './recipeCard';

const propTypes = {
  allRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const RecipeCardGrid = props => (
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
      props.allRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          recipeName={recipe.recipeName}
          upvotes={recipe.upvotes}
          image={recipe.image}
          downvotes={recipe.downvotes}
          user={recipe.addedBy}
        />
        ))
    }
    </div>
  </div>
);

RecipeCardGrid.propTypes = propTypes;

export default RecipeCardGrid;
