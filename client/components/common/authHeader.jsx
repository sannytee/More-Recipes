/**
 *  @fileOverview Creates header for authenticated users
 *
 *  @author       Sanni Taiwo
 *
 *  @requires     NPM:react
 *  @requires     NPM:react-router
 *  @requires     NPM:react-redux
 *  @requires     NPM:redux
 *  @requires     NPM:toastr
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import firebase from 'firebase';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { createRecipeAction, searchRecipes } from '../../actionsCreator/recipes';
import { logoutAction } from '../../actions/authAction';
import AddRecipeForm from './addRecipeForm';

const propTypes = {
  actions: PropTypes.shape({
    createRecipeAction: PropTypes.func,
    logoutAction: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  })
};

const defaultProps = {
  user: null,
};


/**
 * @description class to represent authenticated user header
 * @extends Component
 */
export class AuthHeader extends Component {
  /**
   * @description loads the recipes searched for
   *
   * @param {string} input
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  static getRecipes(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return searchRecipes(input);
  }
  /**
   * @description Creates a recipe
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    const defaultImage = 'https://www.unident.no/media/com_hwdmediashare/assets/images/default-image-4.png';
    this.state = {
      recipeName: '',
      mealType: 'breakfast',
      description: '',
      method: '',
      ingredients: '',
      errorMessage: '',
      image: defaultImage,
      progress: 0,
      isUploading: false,
      notReady: true,
      backspaceRemoves: true,
      multi: false,
      value: '',
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.gotoRecipe = this.gotoRecipe.bind(this);
    this.toggleBackspaceRemoves = this.toggleBackspaceRemoves.bind(this);
  }


  /**
   * @description checks when an element is being focused on
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  onFocus() {
    this.setState({ errorMessage: '' });
  }

  /**
   * @description checks for update in search field
   *
   * @param {string} value
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  onSearchChange(value) {
    this.setState({
      value,
    });
  }

  /**
   * @description checks for update in form entry
   *
   * @param {object} event
   *
   * @memberof authHeader
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
   * @description handles form submission
   *
   * @param {object} event
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.createRecipeAction(this.state)
      .then(() => {
        toastr.success('Recipe successfully added to catalog');
        document.getElementById('recipeForm').reset();
        $('#exampleModal').modal('hide');
        this.setState({
          recipeName: '',
          description: '',
          method: '',
          ingredients: '',
          image: '',
          errorMessage: '',
          notReady: true,
        });
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.error) {
          this.setState({
            errorMessage: 'Please select a meal type'
          });
        } else {
          /* eslint-disable array-callback-return */
          data.map((message) => {
            this.setState({
              errorMessage: message
            });
          });
        }
      });
  }

  /**
   * @description handles logging user out
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  logoutUser() {
    this.props.actions.logoutAction();
    this.context.router.push('/');
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
          image: url,
          progress: 100,
          isUploading: false,
          notReady: false
        });
      });
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
   * @description redirect to selected recipe
   *
   * @param {object} value
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  gotoRecipe(value) {
    this.context.router.push(`/recipes/${value.id}`);
  }

  /**
   * @description removes searched recipe on backspace  entered
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  toggleBackspaceRemoves() {
    this.setState({
      backspaceRemoves: !this.state.backspaceRemoves
    });
  }

  /**
   * @description renders the component
   *
   * @memberof authHeader
   *
   * @returns {void} returns the navbar section of authenticated users
  */
  render() {
    const {
      errorMessage,
      isUploading,
      progress,
      notReady
    } = this.state;
    const AsyncComponent = Select.Async;
    return (
      <header>
        <nav className="navbar fixed-top  navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2b3034' }}>
          <Link className="navbar-brand" to="/recipes">More-Recipes</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="form-inline my-2 my-lg-0 ml-auto ">
              <div className="section" style={{ width: '300px' }}>
                <AsyncComponent
                  multi={this.state.multi}
                  value={this.state.value}
                  onChange={this.onSearchChange}
                  onValueClick={this.gotoRecipe}
                  valueKey="id"
                  labelKey="recipeName"
                  filterOptions={false}
                  loadOptions={AuthHeader.getRecipes}
                  backspaceRemoves={this.state.backspaceRemoves}
                  noResultsText="No recipe found"
                  placeholder="Search for recipe"
                  searchPromptText="Type to search for recipe"
                />
              </div>
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn vote-button rfloat"
                  style={{ float: 'right' }}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Add Recipe
                </button>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                >
                Logged in as {this.props.user && this.props.user.username}
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-profile">Profile</Link>
              </li>
              <li className="nav-item dropdown show">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navlink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Recipes
                </Link>
                <div className="dropdown-menu" aria-labelledby="navlink">
                  <Link
                    className="dropdown-item"
                    to="/my-recipes"
                  >
                    My Recipes
                  </Link>
                  <Link
                    className="dropdown-item nav-text"
                    to="/my-favorite"
                  >
                    Favorite recipes
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <a
                  id="logout"
                  className="nav-link"
                  onClick={this.logoutUser}
                  role="none"
                >
                  Signout
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <AddRecipeForm
          errorMessage={errorMessage}
          isUploading={isUploading}
          mealType={this.state.mealType}
          progress={progress}
          handleProgress={this.handleProgress}
          handleUploadStart={this.handleUploadStart}
          handleUploadSuccess={this.handleUploadSuccess}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          onFocus={this.onFocus}
          notReady={notReady}
        />
      </header>
    );
  }
}

AuthHeader.propTypes = propTypes;
AuthHeader.defaultProps = defaultProps;
AuthHeader.contextTypes = {
  router: PropTypes.object
};

/**
 * @description maps action to properties of authHeader
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createRecipeAction,
      logoutAction,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AuthHeader);
