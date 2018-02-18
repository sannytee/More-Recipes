/**
 *  @fileOverview Creates header for authenticated users
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
class MyRecipeCard extends Component {
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
          <article className="card">
            <img src={recipeDetails.image} alt="recipe" className="card-img-top img-fluid" />
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
                    data-toggle="modal"
                    data-target="#editModal"
                    className="btn edit-btn"
                    onClick={this.getRecipeDetails}
                    type="button"
                  >
                    <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />
                  </button>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <button
                    data-toggle="modal"
                    data-target="#deleteModal"
                    className="btn btn-danger"
                    onClick={this.getRecipeDetails}
                    type="button"
                  >
                    <i className="fa fa-trash-o fa-lg" aria-hidden="true" />
                  </button>
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
