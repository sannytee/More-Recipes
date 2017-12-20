/* eslint-disable no-unused-vars */
import React from 'react';
import img from '../../public/images/recipe-5.jpg';

const recipeCard = props => (
  <div className='col-md-4 card-space'>
    <div className='card-deck'>
      <article className='card'>
        <img src={img} className='card-img-top img-fluid' />
        <div className='card-body'>
          <h3 className='card-title'>
            <a href="" id="remove-link">
              {props.recipeName}
            </a>
          </h3>
        </div>
        <div >
          <div style={{ display: 'inline-flex', marginTop: '10px' }}>
            <div>
              <button className='btn vote-button' type='button'>
                <i className='fa fa-thumbs-up fa-lg' aria-hidden='true'></i>
              </button>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>{props.upvotes}</span>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <button className='btn vote-button' type='button'>
                <i className='fa fa-thumbs-o-down fa-lg' aria-hidden='true'></i>
              </button>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>{props.downvotes}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
);


export default recipeCard;
