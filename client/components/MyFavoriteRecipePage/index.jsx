import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import Header from '../common/AuthHeader';
import Footer from '../common/Footer';
import FavRecipeCard from './FavoriteRecipeCard';
import { getUserFavRecipes } from '../../actionsCreator/recipes';
import verifyUser from '../../util/Authentication';


const propTypes = {
  actions: PropTypes.shape({
    getUserFavRecipes: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  favoriteRecipes: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape())
  ]).isRequired,
  isLoading: PropTypes.bool
};

const defaultProps = {
  isLoading: null
};

/**
 * @description A class to mount all components related to MyFavoriteRecipePage
 * @extends Component
 */
export class MyFavoriteRecipePage extends Component {
  /**
   * handles rendering favorite recipe
   * @param {object} props
  */
  constructor(props) {
    super(props);

    this.renderFavoriteRecipes = this.renderFavoriteRecipes.bind(this);
  }

  /**
   * @description performs an action right after the component mount
   *
   * @memberof MyFavoriteRecipePage
   *
   * @returns {void}
  */
  componentDidMount() {
    if (verifyUser() === true) {
      this.props.actions.getUserFavRecipes(this.props.user.id);
    }
  }

  /**
   * @memberof MyFavoriteRecipePage
   *
   * @returns {void}
  */
  renderFavoriteRecipes() {
    const {
      isLoading,
      favoriteRecipes,
      user
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
    if (favoriteRecipes.message || favoriteRecipes.favorited.length === 0) {
      return (
        <h1 style={{ margin: '150px auto 0', width: '100%', textAlign: 'center' }}>
          You have no favorite recipes
        </h1>
      );
    }
    return favoriteRecipes.favorited.map(favorites => (
      <FavRecipeCard
        key={favorites.id}
        recipe={favorites.Recipe}
        favorite={this.favoriteRecipe}
        userId={user.id}
      />
    ));
  }

  /**
   * @description renders the components
   *
   * @memberof MyFavoriteRecipePage
   *
   * @returns {JSX} returns the components
  */
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="container">
          <div className="row section-popular">
            <div className="col-sm-12">
              <h2 className="pt-3 headline centered">My Favorite Recipes</h2>
            </div>
          </div>
          <div className="row pt-4">
            {
              this.renderFavoriteRecipes()
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/**
 * @description maps state to properties of MyFavoriteRecipePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    favoriteRecipes: state.recipes.favoriteRecipes,
    isLoading: state.recipes.isLoading
  };
}

/**
 * @description maps action to properties of MyFavoriteRecipePage
 *
 * @param  {object} dispatch
 *
 * @returns {object} returns the action to be bind
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserFavRecipes
    }, dispatch)
  };
}

MyFavoriteRecipePage.propTypes = propTypes;
MyFavoriteRecipePage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteRecipePage);
