import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { favoriteARecipe } from '../../actionsCreator/recipes';


/* eslint-disable require-jsdoc */

const propTypes = {
  actions: PropTypes.shape({
    favoriteARecipe: PropTypes.func
  }).isRequired,
  userId: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    recipeName: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
};

class FavoriteRecipeCard extends Component {
  constructor(props) {
    super(props);

    this.favoriteRecipe = this.favoriteRecipe.bind(this);
  }

  favoriteRecipe() {
    const {
      userId,
      recipe,
      index
    } = this.props;
    const data = {
      recipeId: recipe.id
    };
    this.props.actions.favoriteARecipe(userId, data, index);
  }

  render() {
    const {
      recipe
    } = this.props;
    return (
      <div className="col-md-4 card-space">
        <div className="card-deck">
          <article className="card recipe-card">
            <div className="my-recipe-img">
              <img
                src={recipe.image}
                alt="recipe"
                className="card-img-top img-fluid recipe-card-img"
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/recipes/${recipe.id}`} id="remove-link">
                  {recipe.recipeName}
                </Link>
              </h3>
            </div>
            <div >
              <div className="fav-btn">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={this.favoriteRecipe}
                >
                  <i
                    className="fa fa-trash-o fa-2x"
                  />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      favoriteARecipe
    }, dispatch)
  };
}

FavoriteRecipeCard.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(FavoriteRecipeCard);
