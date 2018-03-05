/* eslint-disable  react/no-unused-state  */
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
import ImageUploader from 'react-firebase-image-uploader';
import firebase from 'firebase';
import { Pulse } from 'react-preloading-component';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import 'react-select/dist/react-select.css';
import { createRecipeAction } from '../../actionsCreator/recipes';
import { logoutAction } from '../../actions/authAction';

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
class authHeader extends Component {
  /**
   * @description Creates a recipe
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    this.state = {
      recipeName: '',
      mealType: '',
      description: '',
      method: '',
      ingredients: '',
      errorMessage: '',
      image: '',
      progress: 0,
      isUploading: false,
      notReady: true,
      backspaceRemoves: true,
      multi: true,
      creatable: false,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.gotoUser = this.gotoUser.bind(this);
    this.toggleBackspaceRemoves = this.toggleBackspaceRemoves.bind(this);
  }


  /**
   * @description checks when an element is being focused on
   * @memberof authHeader
   * @returns {void}
  */
  onFocus() {
    this.setState({ errorMessage: '' });
  }

  /**
   * @description checks for update in form entry
   * @param {object} event
   * @memberof authHeader
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
   * @param {object} event
   * @memberof authHeader
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
          mealType: '',
          description: '',
          method: '',
          ingredients: '',
          image: '',
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

  onChange(value) {
    this.setState({
      value,
    });
    console.log(this.state.value);
  }

  /* eslint-disable class-methods-use-this  */
  getUsers(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`/api/v1/search?recipe=${input}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(json.recipes);
        const test = [
          {
            addedBy: "example20",
            createdAt: "2018-03-05T10:35:22.361Z",
            description:"awesomestuff",
            downvotes: 0,
            id:12,
            image:"https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F9ebefe78-e406-4835-b350-03cd13c29a9f.jpg?alt=media&token=4b37eb6e-5b9e-4cda-97cf-591d3092733a",
            ingredients:"awesome, stuff,garri",
            mealType:"lunch",
            method:"research",
            recipeName:"awesome stuff",
            updatedAt:"2018-03-05T10:35:22.361Z",
            upvotes:0,
            userId:1
          },
          {
            addedBy: "example20",
            createdAt: "2018-03-05T10:35:22.361Z",
            description:"awesomestuff",
            downvotes: 0,
            id:12,
            image:"https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F9ebefe78-e406-4835-b350-03cd13c29a9f.jpg?alt=media&token=4b37eb6e-5b9e-4cda-97cf-591d3092733a",
            ingredients:"awesome, stuff,garri",
            mealType:"lunch",
            method:"research",
            recipeName:"awesome stuff",
            updatedAt:"2018-03-05T10:35:22.361Z",
            upvotes:0,
            userId:1
          },

          {
            addedBy: "example20",
            createdAt: "2018-03-05T10:35:22.361Z",
            description:"awesomestuff",
            downvotes: 0,
            id:12,
            image:"https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F9ebefe78-e406-4835-b350-03cd13c29a9f.jpg?alt=media&token=4b37eb6e-5b9e-4cda-97cf-591d3092733a",
            ingredients:"awesome, stuff,garri",
            mealType:"lunch",
            method:"research",
            recipeName:"awesome stuff",
            updatedAt:"2018-03-05T10:35:22.361Z",
            upvotes:0,
            userId:1
          },


        ];
        return { options: json.recipes };
      });
  }

  gotoUser(value) {
    this.context.router.push(`/recipes/${value.id}`);
  }

  toggleBackspaceRemoves() {
    this.setState({
      backspaceRemoves: !this.state.backspaceRemoves
    });
  }

  /**
   * @description renders the component
   * @memberof authHeader
   * @returns {void} returns the navbar section of authenticated users
  */
  render() {
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
                  onChange={this.onChange}
                  onValueClick={this.gotoUser}
                  valueKey="id"
                  labelKey={ "recipeName" ||"ingredients" }
                  loadOptions={this.getUsers}
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
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            data-backdrop="static"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            style={{ display: 'none' }}
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header black">
                  <h5 className="modal-title black" id="exampleModalLabel">Add new recipe</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {
                    this.state.errorMessage &&
                    <div className="alert alert-danger">
                      {
                        this.state.errorMessage
                      }
                    </div>
                  }

                  <form onSubmit={this.handleSubmit} id="recipeForm">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label black"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        name="recipeName"
                        className="form-control"
                        id="recipient-name"
                        required
                        onChange={this.handleChange}
                        onFocus={this.onFocus}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="message-text"
                        className="col-form-label black"
                      >
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        name="description"
                        required
                        onChange={this.handleChange}
                        onFocus={this.onFocus}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="image"
                        className="col-form-label black"
                      >
                        Image:
                      </label>
                      {
                        this.state.isUploading &&
                        this.state.progress < 100 &&
                        <div>
                          <Pulse />
                        </div>
                      }
                      <ImageUploader
                        name="image"
                        storageRef={
                          firebase
                            .storage()
                            .ref('images')
                        }
                        onProgress={this.handleProgress}
                        onUploadSuccess={this.handleUploadSuccess}
                        onUploadStart={this.handleUploadStart}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="type-text"
                        className="col-form-label black"
                      >
                        Type of meal:
                      </label>
                      <select
                        value={this.state.mealType}
                        name="mealType"
                        className="form-control"
                        id="type-text"
                        required
                        onChange={this.handleChange}
                        onFocus={this.onFocus}
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="brunch">Brunch</option>
                        <option value="elevenses">Elevenses</option>
                        <option value="lunch">Lunch</option>
                        <option value="tea">Tea</option>
                        <option value="supper">Supper</option>
                        <option value="dinner">Dinner</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="ingredients-text"
                        className="col-form-label black"
                      >
                        ingredients:
                      </label>
                      <textarea
                        placeholder="separate each ingredient with a comma"
                        name="ingredients"
                        className="form-control"
                        id="ingredients"
                        required
                        onChange={this.handleChange}
                        onFocus={this.onFocus}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="method-text"
                        className="col-form-label black"
                      >
                        Method of cooking:
                      </label>
                      <textarea
                        name="method"
                        required
                        onChange={this.handleChange}
                        onFocus={this.onFocus}
                        className="form-control"
                        id="method-text"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn vote-button"
                        disabled={this.state.notReady}
                      >
                        Add recipe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

authHeader.propTypes = propTypes;
authHeader.defaultProps = defaultProps;
authHeader.contextTypes = {
  router: PropTypes.object
};

/**
 * @description maps action to properties of authHeader
 * @param  {object} dispatch
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

export default connect(null, mapDispatchToProps)(authHeader);
