import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  recipeName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};


const popularRecipeCard = ({ recipeName, id, img }) => (
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
