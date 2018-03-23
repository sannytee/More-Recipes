import React, { PropTypes } from 'react';
import moment from 'moment';


const propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  reviewError: PropTypes.string,
};

const defaultProps = {
  reviewError: null,
};

const Review = props => (
  <section className="border-recipes">
    <h4 className="section-reviews centered" style={{ backgroundColor: '#2b3034' }}>Reviews</h4>
    {
      !props.reviews.length ?
        <h6 style={{ textAlign: 'center' }}>This recipe have not been reviewed</h6>
      :
        <ul style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {
        props.reviews.map(review => (
          <li key={review.id} className="review-list">
            <div>
              <div >
                <div className="header">
                  <strong className="primary-font username">{review.username}</strong>
                  <strong
                    className="primary-font pull-right"
                    style={{ paddingRight: '10px' }}
                  >
                    {moment(new Date(review.createdAt)).fromNow()}
                  </strong>
                </div>
                <p>
                  { review.review }
                </p>
                <hr />
              </div>
            </div>
          </li>
        ))
      }
        </ul>
  }
    <form id="review-form" onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="comment">Post a review</label>
        <textarea
          name="review"
          className="form-control"
          rows="5"
          id="comment"
          onChange={props.handleChange}
          onFocus={props.onFocus}
          required
        />
        {
          props.reviewError &&
          <div style={{ textAlign: 'center' }} className="alert alert-danger">
            {props.reviewError}
          </div>
        }
      </div>
      <button type="submit" id="reviewButton" className="btn vote-button pull-right">Submit</button>
    </form>
  </section>
);
Review.propTypes = propTypes;
Review.defaultProps = defaultProps;

export default Review;
