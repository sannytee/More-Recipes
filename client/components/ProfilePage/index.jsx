import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'react-preloading-component';
import lodash from 'lodash';
import ImageUploader from 'react-firebase-file-uploader';
import Tooltip from 'react-tooltip';
import firebase from 'firebase';
import Header from '../common/AuthHeader';
import Footer from '../common/Footer';
import img from '../../public/images/iconic.png';
import verifyUser from '../../util/Authentication';
import {
  getUserRecipes,
  getUserFavRecipes,
  getUserProfile,
  updateUserProfile,
} from '../../actionsCreator/recipes';
import UserDetails from './UserDetails';


const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    getUserFavRecipes: PropTypes.func,
    getUserRecipes: PropTypes.func,
    getUserProfile: PropTypes.func,
    updateUserProfile: PropTypes.func
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  myRecipesCount: PropTypes.number,
  favRecipesCount: PropTypes.number,
  profile: PropTypes.shape({
    email: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired
};

const defaultProps = {
  myRecipesCount: null,
  favRecipesCount: null,
};

/**
 * @description A class to mount the profile page
 * @extends Component
 */
export class ProfilePage extends Component {
  /**
   * @description Creates a recipe
   * @param {object} props
   * @param {object} context
  */
  constructor(props, context) {
    super(props, context);
    this.state = {
      image: '',
      progress: 0,
      isUploading: false,
    };

    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
  }
  /**
   * @description performs an action right after the component mount
   *
   * @memberof ProfilePage
   *
   * @returns {void}
  */
  componentDidMount() {
    const {
      actions
    } = this.props;
    if (verifyUser() === true) {
      actions.getUserRecipes(this.props.user.id, 0);
      actions.getUserFavRecipes(this.props.user.id);
      actions.getUserProfile(this.props.user.id);
    }
  }

  /**
   * @description tracks the progress of uploading image
   *
   * @param {number} progress
   *
   * @memberof ProfilePage
   *
   * @returns {void}
  */
  handleProgress(progress) {
    this.setState({ progress });
  }

  /**
   * @description start the upload operation
   *
   * @memberof ProfilePage
   *
   * @returns {void}
  */
  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0, });
  }

  /**
   * @description get url of image uploaded
   *
   * @param {String} filename
   *
   * @memberof ProfilePage
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
        });
      })
      .then(() => {
        const data = {
          image: this.state.image
        };
        this.props.actions.updateUserProfile(this.props.user.id, data);
      });
  }

  /**
   * @description renders the components
   *
   * @memberof ProfilePage
   *
   * @returns {JSX} returns the components
  */
  render() {
    const {
      user,
      isLoading,
      profile,
      myRecipesCount,
      favRecipesCount,
    } = this.props;
    return (
      <div>
        <Header user={user} />
        {
          isLoading || lodash.isEmpty(profile)
            ?
              <div style={{
                marginTop: '150px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              >
                <Spinner />
              </div>
            :
              <div className="container recipe-details">
                <section className="row">
                  <div className="col-sm-2" />
                  <div className="col-sm-8">
                    <div id="profile-card" className="card w-100" style={{ width: '20rem' }}>
                      <div className="row pb-3 centered" style={{ marginTop: '10px' }}>
                        <div className="col-sm-12" >
                          <img
                            className="img-fluid user-image rounded-circle"
                            style={{ height: '150px' }}
                            src={profile.image || img}
                            alt="profile"
                          />
                          {
                            this.state.isUploading &&
                            this.state.progress < 100 &&
                            <div>
                              <Spinner />
                            </div>
                          }
                          <div style={{ marginTop: '5px' }}>
                            <label
                              data-tip
                              data-for="upload"
                              className="custom-link"
                            >
                              <i className="fa fa-camera fa-2x vote-button" aria-hidden="true" />
                              <ImageUploader
                                hidden
                                accept="image/*"
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
                            </label>
                            <Tooltip
                              id="upload"
                              place="top"
                              type="dark"
                            >
                              <span>Upload image</span>
                            </Tooltip >
                          </div>
                        </div>
                      </div>
                      <hr />
                      <UserDetails
                        username={user.username}
                        email={profile.email}
                        myRecipesCount={myRecipesCount}
                        favoriteRecipeCount={favRecipesCount}
                        createdAt={profile.createdAt.split('T')[0]}
                      />
                      <hr />
                    </div>
                  </div>
                </section>
              </div>
        }

        <Footer />
      </div>
    );
  }
}

/**
 * @description maps state to properties of profilePage
 *
 * @param  {object} state
 *
 * @returns {object} returns the state to be mapped to props
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    favRecipesCount: state.recipes.favoriteRecipeCount,
    myRecipesCount: state.recipes.userRecipesCount,
    profile: state.auth.profile,
    isLoading: state.auth.isLoading
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
      getUserRecipes,
      getUserFavRecipes,
      getUserProfile,
      updateUserProfile
    }, dispatch)
  };
}

ProfilePage.propTypes = propTypes;
ProfilePage.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
