/**
 *  @fileOverview Creates the homepage for users
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 *  @requires     NPM:react-redux
 *  @requires     NPM:redux
 *  @requires     NPM:jsonwebtoken
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import Paginate from '../pagination/index';
import Header from '../common/header';
import AuthHeader from '../common/authHeader';
import Footer from '../common/footer';
import RecipeCardGrid from './recipeCardGrid';
import PopularRecipeCardList from './popularRecipeCardList';
import {
  getAllRecipesAction,
  getPopularRecipesAction
} from '../../actionsCreator/recipes';
import { changeAuthAction } from '../../actions/authAction';
import verifyUser from '../../util/Authentication';
import setToken from '../../util/setToken';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }),
  actions: PropTypes.shape({
    getAllRecipesAction: PropTypes.func,
    getPopularRecipesAction: PropTypes.func,
    changeAuthAction: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isauthenticated: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  popularRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
};

const defaultProps = {
  user: null
};


/**
 * @description A class to represent the recipe page
 *
 * @extends Component
 */
class RecipePage extends Component {
  /**
   * handles pagination
   * @param {object} props
  */
  constructor(props) {
    super(props);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
  }
  /**
   * @memberof RecipePage
   * @returns {void}
  */
  componentDidMount() {
    this.props.actions.getAllRecipesAction(0);
    this.props.actions.getPopularRecipesAction();
  }

  /**
   * @memberof RecipePage
   *
   * @param {number} allRecipes
   *
   * @returns {void}
  */
  handlePaginationChange(allRecipes) {
    const currentView = allRecipes.selected;
    this.props.actions.getAllRecipesAction(currentView);
  }
  /**
   * @description return navbar based on if user is authenticated
   *
   * @memberof RecipePage
   *
   * @returns {void} returns navbar
  */
  checkUserState() {
    let notValid;
    if (this.props.isauthenticated === false) {
      return <Header />;
    }
    if (this.props.isauthenticated === true) {
      if (verifyUser() === false) {
        this.props.actions.changeAuthAction();
        setToken(false);
        notValid = true;
      } else {
        notValid = false;
      }

      if (notValid === true) {
        return <Header />;
      }
      if (notValid === false) {
        return <AuthHeader user={this.props.user} />;
      }
    }
  }

  /**
   * @description return recipes
   *
   * @memberof RecipePage
   *
   * @returns {void}
  */
  renderRecipes() {
    const {
      isLoading,
      popularRecipes
    } = this.props;
    if (isLoading) {
      return (
        <div style={{ paddingTop: '150px' }}>
          <Spinner />
        </div>
      );
    }
    return (
      <div className="row">
        <RecipeCardGrid
          allRecipes={this.props.recipes}
        />
        <PopularRecipeCardList popularRecipes={popularRecipes} />
      </div>

    );
  }

  /**
   * @memberof RecipePage
   *
   * @returns {void} returns the component to be mounted
  */
  render() {
    return (
      <div>
        {
          this.checkUserState()
        }
        <div className="content">
          <div className="container cont_area">
            { this.renderRecipes()}
          </div>
        </div>
        <div className="sticky-paginate">
          <Paginate
            handlePaginationChange={this.handlePaginationChange}
            page={this.props.page}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

RecipePage.propTypes = propTypes;
RecipePage.defaultProps = defaultProps;

/**
 * @description maps state to properties of RecipePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be bind
 */
function mapStateToProps(state) {
  return {
    isauthenticated: state.auth.authenticated,
    user: state.auth.user,
    recipes: state.recipes.recipes,
    popularRecipes: state.recipes.popularRecipes,
    page: state.recipes.pages,
    isLoading: state.recipes.isLoading
  };
}

/**
 * @description maps action to properties of authHeader
 *
 * @param  {dispatch} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllRecipesAction,
      getPopularRecipesAction,
      changeAuthAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
