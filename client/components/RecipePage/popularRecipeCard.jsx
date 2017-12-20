/* eslint-disable no-unused-vars */
import React from 'react';
import img from '../../public/images/recipe-6.jpg';

/* eslint-disable no-unused-vars */
const popularRecipeCard = props => (
  <div className="side_recipes">
    <a className="side_item" href="/recipes/:recipeId">
      <div className="img">
        <img
          src={img}
          alt=""
          style={{
            height: 'auto',
            width: '100px',
            marginLeft: '0px',
            marginTop: '-13.3571px'
          }} />
      </div>
      <div
        className="title dot"
        style={{ wordWrap: 'break-word' }}>
        {props.recipeName}
        </div>
    </a>
  </div>
);

export default popularRecipeCard;
