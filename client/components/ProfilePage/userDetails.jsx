import React, { PropTypes } from 'react';

const propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  myRecipesCount: PropTypes.number.isRequired,
  favRecipesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

const userDetails = props => (
  <div className="row">
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <h5>
            username: <span>{props.username}</span>
          </h5>
        </div>
        <div className="col-sm-12">
          <h5>
            Email: <span>{props.email}</span>
          </h5>
        </div>
        <div className="col-sm-12">
          <h5>
            Recipe Added: <span>{props.myRecipesCount}</span>
          </h5>
        </div>
        <div className="col-sm-12">
          <h5>
            Favorite Recipes: <span>{props.favRecipesCount}</span>
          </h5>
        </div>
        <div className="col-sm-12">
          <h5>
            Date Created: <span>{props.createdAt}</span>
          </h5>
        </div>
      </div>
    </div>
  </div>
);

userDetails.propTypes = propTypes;
export default userDetails;
