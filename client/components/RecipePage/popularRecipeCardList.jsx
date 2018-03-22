import React, { PropTypes } from 'react';
import PopularRecipeCard from './PopularRecipeCard';

const propTypes = {
  popularRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const PopularRecipeCardList = props => (
  <div className="col-lg-3 col-md-12">
    <aside className="sidebar">
      <div className="side_rec_area">
        <div className="side_title">
          Popular Recipes
        </div>
        {
          props.popularRecipes.map(recipes => (
            <PopularRecipeCard
              recipeName={recipes.recipeName}
              id={recipes.id}
              key={recipes.id}
              image={recipes.image}
            />
          ))
        }
      </div>
    </aside>
  </div>
);

PopularRecipeCardList.propTypes = propTypes;

export default PopularRecipeCardList;
