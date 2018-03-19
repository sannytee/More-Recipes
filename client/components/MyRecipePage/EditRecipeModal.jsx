import React, { PropTypes } from 'react';
import ImageUploader from 'react-firebase-image-uploader';
import firebase from 'firebase';
import { Pulse } from 'react-preloading-component';


const propTypes = {
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  startUpload: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  details: PropTypes.shape({
    recipeName: PropTypes.string,
    description: PropTypes.string,
    mealType: PropTypes.string,
    ingredients: PropTypes.string,
    method: PropTypes.string
  }).isRequired
};

const EditRecipeModal = props => (
  <div
    className="modal fade"
    id="editModal"
    tabIndex="-1"
    data-backdrop="static"
    role="dialog"
    aria-labelledby="editModalLabel"
    style={{ display: 'none' }}
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header black">
          <h5 className="modal-title black" id="editModalLabel">Edit Recipe</h5>
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
          <form
            onSubmit={props.handleSubmit}
            id="editRecipeForm"
          >
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label black">Title:</label>
              <input
                value={props.details.recipeName}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                type="text"
                name="recipeName"
                className="form-control"
                id="recipient-name"
                required
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
                value={props.details.description}
                className="form-control"
                onChange={props.handleChange}
                onFocus={props.onFocus}
                id="message-text"
                name="description"
                required
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
                name="image"
                storageRef={
                  firebase
                    .storage()
                    .ref('images')
                }
                onProgress={props.onProgress}
                onUploadSuccess={props.upload}
                onUploadStart={props.startUpload}
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
                value={props.details.mealType}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                name="mealType"
                className="form-control"
                id="type-text"
                required
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
                value={props.details.ingredients}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                placeholder="separate each ingredient with a comma"
                name="ingredients"
                className="form-control"
                id="ingredients"
                required
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
                value={props.details.method}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                required
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
                id="editButton"
                type="submit"
                className="btn vote-button"
              >
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

EditRecipeModal.propTypes = propTypes;

export default EditRecipeModal;
