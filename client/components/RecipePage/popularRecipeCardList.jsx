import React, { PropTypes } from 'react';
import PopularRecipeCard from './popularRecipeCard';

const propTypes = {
  popularRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const popularRecipeCardList = props => (
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
              img={recipes.image}
            />
          ))
        }
      </div>
    </aside>
  </div>
);

popularRecipeCardList.propTypes = propTypes;

export default popularRecipeCardList;
