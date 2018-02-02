/* eslint-disable no-unused-vars */
/**
 *  @fileOverview renders the user recipes page
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 *  @requires     NPM:react-redux
 *  @requires     NPM:redux
 *  @requires     NPM:toastr
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Header from '../common/authHeader';
import Footer from '../common/footer';
import MyRecipeCard from './MyRecipeCard';
import EditRecipeModal from './EditRecipeModal';
import DeleteRecipeModal from './deleteRecipeModal';
import { logoutAction } from '../../actions/authAction';
import verifyUser from '../../util/Authentication';
import {
  getUserRecipes,
  editRecipeAction,
  deleteRecipeAction,
} from '../../actions/recipesAction';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }),
  actions: PropTypes.shape({
    logoutAction: PropTypes.func,
    getUserRecipes: PropTypes.func,
    deleteRecipeAction: PropTypes.func,
    editRecipeAction: PropTypes.func
  }).isRequired,
  userRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
const defaultProps = {
  user: null
};


/**
 * @description A class to mount all components related to MyRecipePage
 * @extends Component
 */
class MyRecipePage extends Component {
  /**
   * handles editing recipe
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    this.state = {
      recipe: {
        recipeName: '',
      },
      index: '',
      errorMessage: ''
    };

    this.renderUserRecipes = this.renderUserRecipes.bind(this);
    this.setRecipe = this.setRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  /**
   * @description performs an action right after the component mount
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  componentDidMount() {
    if (verifyUser() === true) {
      this.props.actions.getUserRecipes(this.props.user.id);
    }
  }

  /**
   * @description removes errorMessage when focused
   *
   * @param {object} event
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  onFocus(event) {
    this.setState({ errorMessage: '' });
  }

  /**
   * @description get the current recipe from the user recipes
   *
   * @param {number} index
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  setRecipe(index) {
    this.setState({
      recipe: this.props.userRecipes[index],
      index,
    });
  }

  /**
   * @description handles the deletion of recipe
   *
   * @param {object} event
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  handleDeletion(event) {
    const { recipe, index } = this.state;
    this.props.actions.deleteRecipeAction(recipe.id, index)
      .then(() => {
        toastr.success('Recipe successfully deleted');
        $('#deleteModal').modal('hide');
      });
  }

  /**
   * @description handles the submission of form
   *
   * @param {object} event
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  handleSubmit(event) {
    const { recipe, index } = this.state;
    event.preventDefault();
    this.props.actions.editRecipeAction(recipe.id, recipe, index)
      .then(() => {
        toastr.success('Recipe successfully updated');
        $('#editModal').modal('hide');
      })
      .catch((err) => {
        const { data } = err.response;
        /* eslint-disable array-callback-return */
        data.map((message) => {
          this.setState({
            errorMessage: message
          });
        });
      });
  }


  /**
   * @description checks for update in form entry
   *
   * @param {object} event
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      recipe: {
        ...this.state.recipe,
        [name]: value
      }
    });
  }


  /**
   * @description checks if a user have recipes
   *
   * @memberof MyRecipePage
   *
   * @returns {void} returns a components
  */
  renderUserRecipes() {
    if (this.props.userRecipes.length === 0) {
      return (
        <h1>
          You have no Recipe
        </h1>
      );
    }
    return this.props.userRecipes.map((recipes, i) => (
      <MyRecipeCard
        key={recipes.id}
        index={i}
        recipeDetails={recipes}
        getRecipe={this.setRecipe}
      />
    ));
  }

  /**
   * @description renders the components
   *
   * @memberof MyRecipePage
   *
   * @returns {void} returns the components
  */
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="container">
          <div className="row section-popular">
            <div className="col-sm-12">
              <h2 className="pt-3 headline centered">My Recipes</h2>
            </div>
          </div>
          <div className="row pt-4">
            { this.renderUserRecipes()}
          </div>
          <EditRecipeModal
            details={this.state.recipe}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errorMessage={this.state.errorMessage}
            onFocus={this.onFocus}
          />
          <DeleteRecipeModal
            handleDeletion={this.handleDeletion}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

MyRecipePage.propTypes = propTypes;

MyRecipePage.defaultProps = defaultProps;

MyRecipePage.contextTypes = {
  router: PropTypes.object
};

/**
 * @description maps state to properties of MyRecipePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userRecipes: state.recipes.userRecipes
  };
}

/**
 * @description maps action to properties of MyRecipePage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserRecipes,
      editRecipeAction,
      deleteRecipeAction,
      logoutAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipePage);
