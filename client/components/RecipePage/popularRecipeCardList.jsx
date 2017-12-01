/* eslint-disable no-unused-vars */
import React from 'react';
import PopularRecipeCard from './popularRecipeCard'

const popularRecipeCardList = (props) => {
  return (
    <div className="col-lg-3 col-md-12">
      <aside className="sidebar">
        <div className="side_rec_area">
          <div className="side_title">
            Popular Recipe
          </div>
          <PopularRecipeCard/>
        </div>
      </aside>
    </div>
  );
};

export default popularRecipeCardList;
