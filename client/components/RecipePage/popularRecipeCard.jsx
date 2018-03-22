import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  recipeName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};


const PopularRecipeCard = ({ recipeName, id, image }) => (
  <div className="side_recipes">
    <Link className="side_item" to={`/recipes/${id}`}>
      <div className="img">
        <img
          src={image}
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

PopularRecipeCard.propTypes = propTypes;

export default PopularRecipeCard;
