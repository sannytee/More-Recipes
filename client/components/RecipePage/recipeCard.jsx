import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import img from '../../public/images/recipe-5.jpg';
import { voteRecipeAction } from '../../actions/recipesAction';
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
};


/**
 * @description A class to mount the recipe card
 * @extends Component
 */
class recipeCard extends Component {
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
    } = this.props;
    return (
      <div className="col-md-4 card-space">
        <div className="card-deck">
          <article className="card">
            <img
              src={img}
              alt="recipe"
              className="card-img-top img-fluid"
            />
            <div className="card-body">
              <h3 className="card-title">
                <a href="" id="remove-link">
                  {recipeName}
                </a>
              </h3>
            </div>
            <div >
              <div style={{ display: 'inline-flex', marginTop: '10px' }}>
                <div>
                  <button
                    onClick={this.upvoteRecipe}
                    id={id}
                    className="btn vote-button"
                    type="button"
                  >
                    <i className="fa fa-thumbs-up fa-lg" aria-hidden="true">
                      <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {upvotes}
                      </span>
                    </i>
                  </button>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <button
                    className="btn vote-button"
                    type="button"
                    onClick={this.downvoteRecipe}
                  >
                    <i className="fa fa-thumbs-o-down fa-lg" aria-hidden="true">
                      <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {downvotes}
                      </span>
                    </i>
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

recipeCard.contextTypes = {
  router: PropTypes.object
};

recipeCard.propTypes = propTypes;

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

export default connect(null, mapDispatchToProps)(recipeCard);
