import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import lodash from 'lodash';
import Header from '../common/AuthHeader';
import {
  getRecipeData,
  postReview,
  resetReviewError,
  voteARecipe,
  favoriteRecipe,
  getFavoriteIds
} from '../../actionsCreator/recipes';
import Footer from '../common/Footer';
import img from '../../public/images/recipe-10.jpg';
import RecipeInfo from './RecipeInfo';
import Reviews from './Reviews';
import verifyUser from '../../util/Authentication';

const propTypes = {
  actions: PropTypes.shape({
    getRecipeData: PropTypes.func,
    resetReviewError: PropTypes.func,
    postReview: PropTypes.func,
    voteARecipe: PropTypes.func,
    favoriteRecipe: PropTypes.func,
  }).isRequired,
  params: PropTypes.shape({
    recipeId: PropTypes.string
  }).isRequired,
  recipeDetails: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    method: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  error: PropTypes.string,
  reviewError: PropTypes.string,
  favoriteIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

const defaultProps = {
  error: null,
  reviewError: null,
};


/**
 * @description A class to mount all components related to details of recipe
 * @extends Component
 */
export class RecipeDetailsPage extends Component {
  /**
   * handles displaying details of  a recipe
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    this.state = {
      review: '',
    };

    this.renderComponent = this.renderComponent.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.upvoteARecipe = this.upvoteARecipe.bind(this);
    this.downvoteARecipe = this.downvoteARecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
  }

  /**
   * @description performs an action right after the component mount
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  componentDidMount() {
    const {
      actions,
      params,
      user
    } = this.props;
    if (verifyUser() === true) {
      actions.getRecipeData(params.recipeId);
      actions.getFavoriteIds(user.id);
    }
  }


  /**
   * @description removes review error when focused
   *
   * @param {object} event
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  onFocus() {
    const error = '';
    this.props.actions.resetReviewError(error);
  }

  /**
   * @description checks for update in form entry
   *
   * @param {object} event
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description handles the submission of form
   *
   * @param {object} event
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.postReview(this.props.recipeDetails.id, this.state);
    this.setState({
      review: ''
    });
  }

  /**
   * @description handles the upvoting of a recipe
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  upvoteARecipe() {
    const { recipeDetails } = this.props;
    const upvotes = 'upvotes';
    this.props.actions.voteARecipe(recipeDetails.id, upvotes);
  }

  /**
   * @description handles the downvoting of a recipe
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  downvoteARecipe() {
    const { recipeDetails } = this.props;
    const downvotes = 'downvotes';
    this.props.actions.voteARecipe(recipeDetails.id, downvotes);
  }

  /**
   * @description handles the favoriting of a recipe
   *
   * @memberof RecipeDetailsPage
   *
   * @returns {void}
  */
  favoriteRecipe() {
    const { recipeDetails, user } = this.props;
    const data = {
      recipeId: recipeDetails.id
    };
    this.props.actions.favoriteRecipe(user.id, data);
  }


  /**
   * @description checks various condition before rendering component
   *
   * @returns {void}
  */
  renderComponent() {
    const {
      recipeDetails,
      isLoading,
      error
    } = this.props;
    if (error !== null) {
      return (
        <h1 style={{ paddingTop: '150px' }}>
          404 Not found
        </h1>
      );
    }
    if (isLoading || lodash.isEmpty(recipeDetails)) {
      return (
        <div style={{ paddingTop: '350px' }}>
          <Spinner />
        </div>
      );
    }
    return (
      <div className="container recipe-details">
        <section className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="card w-100" style={{ width: '20rem' }}>
              <RecipeInfo
                img={img}
                recipeDetails={recipeDetails}
                upvote={this.upvoteARecipe}
                downvote={this.downvoteARecipe}
                favorite={this.favoriteRecipe}
                favorited={this.props.favoriteIds.includes(recipeDetails.id)}
              />
              <Reviews
                reviews={recipeDetails.reviews}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                reviewError={this.props.reviewError}
                onFocus={this.onFocus}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }


  /**
   * @description renders the components
   *
   * @memberof  RecipeDetailsPage
   *
   * @returns {void} returns the components
  */
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        {
          this.renderComponent()
        }
        <Footer />
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = propTypes;
RecipeDetailsPage.defaultProps = defaultProps;

/**
 * @description maps state to properties of RecipeDetailsPage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    recipeDetails: state.recipes.currentRecipe,
    isLoading: state.recipes.isLoading,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    error: state.recipes.error,
    reviewError: state.recipes.reviewError,
    favMessage: state.recipes.favMessage,
    favoriteIds: state.recipes.favoriteRecipesIds
  };
}


/**
 * @description maps action to properties of RecipeDetailsPage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getRecipeData,
      postReview,
      resetReviewError,
      voteARecipe,
      favoriteRecipe,
      getFavoriteIds
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
