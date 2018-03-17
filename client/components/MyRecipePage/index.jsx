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
import firebase from 'firebase';
import { Spinner } from 'react-preloading-component';
import Header from '../common/authHeader';
import Footer from '../common/footer';
import { MyRecipeCard } from './MyRecipeCard';
import EditRecipeModal from './EditRecipeModal';
import DeleteRecipeModal from './deleteRecipeModal';
import { logoutAction } from '../../actions/authAction';
import verifyUser from '../../util/Authentication';
import Paginate from '../pagination/index';
import {
  getUserRecipes,
  editRecipeAction,
  deleteRecipeAction,
} from '../../actionsCreator/recipes';

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
  isLoading: PropTypes.bool.isRequired,
  pages: PropTypes.number.isRequired
};
const defaultProps = {
  user: null
};


/**
 * @description A class to mount all components related to MyRecipePage
 * @extends Component
 */
export class MyRecipePage extends Component {
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
      errorMessage: '',
      progress: 0,
      isUploading: false,
    };

    this.renderUserRecipes = this.renderUserRecipes.bind(this);
    this.setRecipe = this.setRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
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
      this.props.actions.getUserRecipes(this.props.user.id, 0);
    }
  }

  /**
   * @description removes errorMessage when focused
   *
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  onFocus() {
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
   * @memberof MyRecipePage
   *
   * @returns {void}
  */
  handleDeletion() {
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
   * @memberof MyRecipePage
   *
   * @param {number} allUserRecipes
   *
   * @returns {void}
  */
  handlePaginationChange(allUserRecipes) {
    const currentView = allUserRecipes.selected;
    this.props.actions.getUserRecipes(this.props.user.id, currentView);
  }

  /**
   * @description get url of image uploaded
   *
   * @param {String} filename
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          recipe: {
            ...this.state.recipe,
            image: url
          },
          progress: 100,
          isUploading: false,
        });
      });
  }

  /**
   * @description start the upload operation
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0, });
  }

  /**
   * @description tracks the progress of uploading image
   *
   * @param {number} progress
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  handleProgress(progress) {
    this.setState({ progress });
  }


  /**
   * @description checks if a user have recipes
   *
   * @memberof MyRecipePage
   *
   * @returns {void} returns a components
  */
  renderUserRecipes() {
    const {
      userRecipes,
      isLoading
    } = this.props;
    if (isLoading) {
      return (
        <div style={{
          marginTop: '150px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        >
          <Spinner />
        </div>
      );
    }
    if (userRecipes.length === 0) {
      return (
        <h1 style={{ margin: '150px auto 0', width: '100%', textAlign: 'center' }}>
          You do not have any recipe
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
    const {
      pages,
      userRecipes
    } = this.props;
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
            upload={this.handleUploadSuccess}
            startUpload={this.handleUploadStart}
            onProgress={this.onProgress}
            progress={this.state.progress}
            isUploading={this.state.isUploading}

          />
          <DeleteRecipeModal
            handleDeletion={this.handleDeletion}
          />
        </div>
        {
          pages === 1 || userRecipes.length === 0 ? <div />
          :
          <div className="sticky-paginate">
            <Paginate
              page={this.props.pages}
              handlePaginationChange={this.handlePaginationChange}
            />
          </div>
        }
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
    userRecipes: state.recipes.userRecipes,
    pages: state.recipes.pages,
    isLoading: state.recipes.isLoading,
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
