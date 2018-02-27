import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import Header from '../common/authHeader';
import Footer from '../common/footer';
import FavRecipeCard from './FavoriteRecipeCard';
import { getUserFavRecipes } from '../../actionsCreator/recipes';
import verifyUser from '../../util/Authentication';

/* eslint-disable require-jsdoc */


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


class FavoriteRecipePage extends Component {
  constructor(props) {
    super(props);

    this.renderFavoriteRecipes = this.renderFavoriteRecipes.bind(this);
  }

  componentDidMount() {
    if (verifyUser() === true) {
      this.props.actions.getUserFavRecipes(this.props.user.id);
    }
  }

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
    if (favoriteRecipes.message || favoriteRecipes.length === 0) {
      return (
        <h1 style={{ margin: '150px auto 0', width: '100%', textAlign: 'center' }}>
          You have no favorite recipes
        </h1>
      );
    }
    return favoriteRecipes.map((favorites, i) => (
      <FavRecipeCard
        key={favorites.id}
        recipe={favorites.Recipe}
        index={i}
        favorite={this.favoriteRecipe}
        userId={user.id}
      />
    ));
  }

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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    favoriteRecipes: state.recipes.favoriteRecipes
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
      getUserFavRecipes
    }, dispatch)
  };
}

FavoriteRecipePage.propTypes = propTypes;
FavoriteRecipePage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipePage);
