import React from 'react';
import RecipeCard from './recipeCard';


/* eslint-disable no-unused-vars */
const recipeCardGrid = (props) => {
  return(
    <div className="col-lg-9 col-md-12">
      <div className="row">
        <div className="col-md-12">
          <div className="line small">
            <h2>Recipes</h2>
          </div>
        </div>

      </div>
      <RecipeCard/>
    </div>
  );
  
};

export default recipeCardGrid;
