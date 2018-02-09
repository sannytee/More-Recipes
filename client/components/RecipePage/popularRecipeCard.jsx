import React, { PropTypes } from 'react';
import img from '../../public/images/recipe-6.jpg';

const propTypes = {
  recipeName: PropTypes.string.isRequired
};

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
          }}
        />
      </div>
      <div
        className="title dot"
        style={{ wordWrap: 'break-word' }}
      >
        {props.recipeName}
      </div>
    </a>
  </div>
);

popularRecipeCard.propTypes = propTypes;

export default popularRecipeCard;
