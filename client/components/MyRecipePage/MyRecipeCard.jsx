/**
 *  @fileOverview Creates header for authenticated users
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactToolTip from 'react-tooltip';

const propTypes = {
  getRecipe: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  recipeDetails: PropTypes.shape({
    recipeName: PropTypes.string,
  }).isRequired
};

/**
 * @description A class to create card for each recipes
 *
 * @extends Component
 */
export class MyRecipeCard extends Component {
  /**
   * @description binds the method to get current recipe
   *
   * @param {object} props
   *
   * @returns {void}
  */
  constructor(props) {
    super(props);
    this.getRecipeDetails = this.getRecipeDetails.bind(this);
  }

  /**
   * @description get the current recipe
   *
   * @param {object} event
   *
   * @memberof MyRecipeCard
   *
   * @returns {void}
  */
  getRecipeDetails() {
    this.props.getRecipe(this.props.index);
  }

  /**
   * @description renders the component
   *
   * @param {object} event
   *
   * @memberof MyRecipeCard
   *
   * @returns {void} returns the component
  */
  render() {
    const { recipeDetails } = this.props;
    return (
      <div className="col-md-4 card-space">
        <div className="card-deck">
          <article className="card recipe-card">
            <div className="my-recipe-img">
              <img
                src={recipeDetails.image}
                alt="recipe"
                className="card-img-top img-fluid recipe-card-img"
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/recipes/${recipeDetails.id}`} id="remove-link">
                  {recipeDetails.recipeName}
                </Link>
              </h3>
            </div>
            <div >
              <div style={{ display: 'inline-flex', marginTop: '10px' }}>
                <div>
                  <button
                    data-tip
                    data-for="edit"
                    data-toggle="modal"
                    data-target="#editModal"
                    className="btn edit-btn"
                    onClick={this.getRecipeDetails}
                    type="button"
                  >
                    <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />
                  </button>
                  <ReactToolTip
                    id="edit"
                    type="dark"
                    place="left"
                  >
                    <span>Edit Recipe</span>
                  </ReactToolTip>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <button
                    data-tip
                    data-for="delete"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    className="btn btn-danger"
                    onClick={this.getRecipeDetails}
                    type="button"
                  >
                    <i className="fa fa-trash-o fa-lg" aria-hidden="true" />
                  </button>
                  <ReactToolTip
                    id="delete"
                    type="dark"
                    place="right"
                  >
                    <span>Delete Recipe</span>
                  </ReactToolTip>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

MyRecipeCard.propTypes = propTypes;

export default MyRecipeCard;
