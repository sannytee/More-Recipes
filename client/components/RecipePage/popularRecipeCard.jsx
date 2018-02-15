import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import img from '../../public/images/recipe-6.jpg';

const propTypes = {
  recipeName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};


const popularRecipeCard = ({ recipeName, id }) => (
  <div className="side_recipes">
    <Link className="side_item" to={`/recipes/${id}`}>
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
        {recipeName}
      </div>
    </Link>
  </div>
);

popularRecipeCard.propTypes = propTypes;

export default popularRecipeCard;
