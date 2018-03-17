import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Tooltip from 'react-tooltip';
import { voteRecipeAction } from '../../actionsCreator/recipes';
import { changeAuthAction } from '../../actions/authAction';


const propTypes = {
  actions: PropTypes.shape({
    voteRecipeAction: PropTypes.func,
    changeAuthAction: PropTypes.func,
  }).isRequired,
  id: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};


/**
 * @description A class to mount the recipe card
 * @extends Component
 */
export class RecipeCard extends Component {
  /**
   * enables action to the performed on this component
   *
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);

    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
  }

  /**
   * @description handles the upvoting of a recipe
   *
   * @param {object} event
   *
   * @memberof recipeCard
   *
   * @returns {void}
  */
  upvoteRecipe(event) {
    event.preventDefault();
    this.props.actions.voteRecipeAction(this.props.id, 'upvotes', this.props.i)
      .catch((err) => {
        const { data } = err.response;
        if (data.message !== 'Session has expired') {
          toastr.error('Login to continue');
          this.context.router.push('/signin');
        } else {
          this.props.actions.changeAuthAction();
          toastr.error(data.message);
          this.context.router.push('/signin');
        }
      });
  }

  /**
   * @description handles the downvoting of a recipe
   *
   * @param {object} event
   *
   * @memberof recipeCard
   *
   * @returns {void}
  */
  downvoteRecipe(event) {
    event.preventDefault();
    this.props.actions.voteRecipeAction(this.props.id, 'downvotes', this.props.i)
      .catch((err) => {
        const { data } = err.response;
        if (data.message !== 'Session has expired') {
          toastr.error('Login to continue');
          this.context.router.push('/signin');
        } else {
          this.props.actions.changeAuthAction();
          toastr.error(data.message);
          this.context.router.push('/signin');
        }
      });
  }

  /**
   * @description renders the components
   *
   * @memberof recipeCard
   *
   * @returns {void} returns the components
  */
  render() {
    const {
      recipeName,
      id,
      upvotes,
      downvotes,
      image,
      user,
    } = this.props;
    return (
      <div className="col-md-4 card-space">
        <div className="card-deck">
          <article className="card recipe-card">
            <img
              style={{ height: '150px' }}
              src={image}
              alt="recipe"
              className="card-img-top img-fluid"
            />
            <div className="card-body">
              <h3 className="card-title">
                <Link id="remove-link" to={`/recipes/${id}`}>
                  {recipeName}
                </Link>
              </h3>
            </div>
            <div >
              <div style={{ display: 'inline-flex', marginTop: '10px' }}>
                <div>
                  <button
                    data-tip
                    data-for="upvote"
                    onClick={this.upvoteRecipe}
                    id={id}
                    className="btn vote-button"
                    type="button"
                  >
                    <i className="fa fa-thumbs-up" aria-hidden="true">
                      <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {upvotes}
                      </span>
                    </i>
                  </button>
                  <Tooltip
                    id="upvote"
                    type="dark"
                    place="top"
                  >
                    <span> upvote recipe</span>
                  </Tooltip >
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <button
                    data-tip
                    data-for="downvote"
                    className="btn vote-button"
                    type="button"
                    onClick={this.downvoteRecipe}
                  >
                    <i className="fa fa-thumbs-o-down" aria-hidden="true">
                      <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {downvotes}
                      </span>
                    </i>
                  </button>
                </div>
                <Tooltip
                  id="downvote"
                  type="dark"
                  place="right"
                >
                  <span> downvote recipe</span>
                </Tooltip >
              </div>
            </div>
            <div className="card-footer text-muted" style={{ marginTop: '15px', fontSize: '12px' }}>
              recipe by: {user}
            </div>
          </article>
        </div>
      </div>
    );
  }
}

RecipeCard.contextTypes = {
  router: PropTypes.object
};

RecipeCard.propTypes = propTypes;

/**
 * @description maps action to properties of SigninPage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      voteRecipeAction,
      changeAuthAction
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RecipeCard);
