import React, { PropTypes } from 'react';

const propTypes = {
  recipeDetails: PropTypes.shape({
    recipeName: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.string,
    method: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  }).isRequired,
  img: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
};

/* eslint-disable react/no-array-index-key  */

const RecipeInfo = props => (
  <div>
    <img className="card-img-top" src={props.img} alt="Card pic cap" style={{ maxHeight: '350px' }} />
    <div className="card-body">
      <h4 className="card-title">{props.recipeDetails.recipeName}</h4>
      <p className="card-text">
        {props.recipeDetails.description}
      </p>
      <hr />
      <div>
        <h6>Ingredients</h6>
        <ul>
          <div className="row">
            {
              props.recipeDetails.ingredients.split(',').map((ingredients, i) => (
                <li
                  className="col-md-6"
                  style={{ paddingTop: '5px', fontSize: '18px' }}
                  key={i}
                >
                  {ingredients}
                </li>
              ))
            }
          </div>

        </ul>
      </div>
      <hr />
      <div>
        <h6>
          Direction
        </h6>
        <ol>
          {
            props.recipeDetails.method.split('\n').map((method, i) => (
              <li key={i}>
                {method}
              </li>
            ))
          }
        </ol>
      </div>
      <hr />
      <div style={{ display: 'inline-flex' }}>
        <div>
          <button className="btn vote-button" type="button" onClick={props.upvote}>
            <i className="fa fa-thumbs-up fa-lg" aria-hidden="true">
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                {props.recipeDetails.upvotes}
              </span>
            </i>
          </button>
        </div>
        <div style={{ marginLeft: '8px', marginRight: '5px' }}>
          <button className="btn vote-button" type="button" onClick={props.downvote} >
            <i className="fa fa-thumbs-down fa-lg" aria-hidden="true">
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                {props.recipeDetails.downvotes}
              </span>
            </i>
          </button>
        </div>
        <div style={{ marginLeft: '8px', marginRight: '5px' }}>
          <button className="btn vote-button" type="button" onClick={props.favorite} >
            <i className="fa fa-heart" />
          </button>
        </div>
      </div>
      <hr />
    </div>
  </div>
);

RecipeInfo.propTypes = propTypes;

export default RecipeInfo;
