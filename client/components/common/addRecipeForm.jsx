import React, { PropTypes } from 'react';
import { Pulse } from 'react-preloading-component';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';

const propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  handleProgress: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  mealType: PropTypes.string.isRequired,
};

const defaultProps = {
  errorMessage: '',
};

const AddRecipeForm = props => (
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
            props.errorMessage &&
            <div className="alert alert-danger">
              {
                props.errorMessage
              }
            </div>
          }

          <form onSubmit={props.handleSubmit} id="recipeForm">
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
                onChange={props.handleChange}
                onFocus={props.onFocus}
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
                onChange={props.handleChange}
                onFocus={props.onFocus}
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
                props.isUploading &&
                props.progress < 100 &&
                <div>
                  <Pulse />
                </div>
              }
              <ImageUploader
                id="uploadImage"
                name="image"
                storageRef={
                  firebase
                    .storage()
                    .ref('images')
                }
                onProgress={props.handleProgress}
                onUploadSuccess={props.handleUploadSuccess}
                onUploadStart={props.handleUploadStart}
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
                value={props.mealType}
                name="mealType"
                className="form-control"
                id="type-text"
                required
                onChange={props.handleChange}
                onFocus={props.onFocus}
              >
                <option defaultValue="breakfast">Breakfast</option>
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
                Ingredients:
              </label>
              <textarea
                placeholder="separate each ingredient with a comma"
                name="ingredients"
                className="form-control"
                id="ingredients"
                required
                onChange={props.handleChange}
                onFocus={props.onFocus}
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
                onChange={props.handleChange}
                onFocus={props.onFocus}
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
              >
                Add recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

AddRecipeForm.propTypes = propTypes;
AddRecipeForm.defaultProps = defaultProps;

export default AddRecipeForm;
