/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import img from '../../public/images/recipe-5.jpg';
import { voteRecipeAction } from '../../actions/recipesAction';
import { changeAuthAction } from '../../actions/authAction';


/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

class recipeCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
  }

  upvoteRecipe(event) {
    event.preventDefault();
    this.props.actions.voteRecipeAction(this.props.id, 'upvotes', this.props.i)
      .catch((err) => {
        const { data } = err.response;
        if (data.message !== 'Session has expired') {
          toastr.error('Login to continue');
          this.context.router.push('/signin');
        } else {
          this.props.actions.changeAuthAction();
          toastr.error(data.message);
          this.context.router.push('/signin');
        }
      });
  }

  downvoteRecipe(event) {
    event.preventDefault();
    this.props.actions.voteRecipeAction(this.props.id, 'downvotes', this.props.i)
      .catch((err) => {
        const { data } = err.response;
        if (data.message !== 'Session has expired') {
          toastr.error('Login to continue');
          this.context.router.push('/signin');
        } else {
          this.props.actions.changeAuthAction();
          toastr.error(data.message);
          this.context.router.push('/signin');
        }
      });
  }

  render() {
    const {
      recipeName,
      id,
      upvotes,
      downvotes,
    } = this.props;
    return (
      <div className='col-md-4 card-space'>
        <div className='card-deck'>
          <article className='card'>
            <img src={img} className='card-img-top img-fluid' />
            <div className='card-body'>
              <h3 className='card-title'>
                <a href="" id="remove-link">
                  {recipeName}
                </a>
              </h3>
            </div>
            <div >
              <div style={{ display: 'inline-flex', marginTop: '10px' }}>
                <div>
                  <button
                    onClick={this.upvoteRecipe}
                    id={id}
                    className='btn vote-button'
                    type='button'>
                    <i className='fa fa-thumbs-up fa-lg' aria-hidden='true'>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>{upvotes}</span>
                    </i>
                  </button>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <button
                    className='btn vote-button'
                    type='button'
                    onClick={this.downvoteRecipe}>
                    <i className='fa fa-thumbs-o-down fa-lg' aria-hidden='true'>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>{downvotes}</span>
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

recipeCard.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      voteRecipeAction,
      changeAuthAction
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(recipeCard);
