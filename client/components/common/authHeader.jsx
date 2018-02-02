/* eslint-disable no-unused-vars */
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
import { createRecipeAction } from '../../actions/recipesAction';
import { logoutAction } from '../../actions/authAction';

const propTypes = {
  actions: PropTypes.shape({
    createRecipeAction: PropTypes.func,
    logoutAction: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired
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
    /* eslint-disable react/no-unused-state */
    this.state = {
      recipeName: '',
      mealType: '',
      description: '',
      method: '',
      ingredients: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }


  /**
   * @description checks when an element is being focused on
   * @param {object} event
   * @memberof authHeader
   * @returns {void}
  */
  onFocus(event) {
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
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.error) {
          this.setState({
            errorMessage: 'Pleae select a meal type'
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
   * @description renders the component
   * @memberof authHeader
   * @returns {void} returns the navbar section of authenticated users
  */
  render() {
    return (
      <header>
        <nav className="navbar fixed-top  navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2b3034' }}>
          <a className="navbar-brand" href="/recipes">More-Recipes</a>
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
            <form className="form-inline my-2 my-lg-0 ml-auto ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn vote-button rfloat"
                  style={{ float: 'right' }}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i className="fa fa-plus-square-o" aria-hidden="true" />
                </button>
              </li>
              <li className="nav-item">
                <span className="nav-link" >Logged in as {this.props.user.username}</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-recipes">My Recipes</Link>
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
                      <button type="submit" className="btn vote-button">Add recipe</button>
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
