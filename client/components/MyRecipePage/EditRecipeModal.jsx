/* eslint-disable no-unused-vars */
import React from 'react';

const EditRecipeModal = props => (
  <div
    className="modal fade"
    id="editModal"
    tabindex="-1"
    data-backdrop="static"
    role="dialog"
    aria-labelledby="editModalLabel"
    style={{ display: 'none' }}
    aria-hidden="true">
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
          id="editRecipeForm">
            <div className="form-group">
              <label for="recipient-name" className="col-form-label black">Title:</label>
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
                for="message-text"
                className="col-form-label black">
                Description:
              </label>
              <textarea
                value={props.details.description}
                className="form-control"
                onChange={props.handleChange}
                onFocus={props.onFocus}
                id="message-text"
                name="description"
                required>
              </textarea>
            </div>
            <div className="form-group">
              <label
                for="type-text"
                className="col-form-label black">
                Type of meal:
              </label>
              <select
                value={props.details.mealType}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                name="mealType"
                className="form-control"
                id="type-text"
                required>
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
                for="ingredients-text"
                className="col-form-label black">
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
                required>
              </textarea>
            </div>
            <div className="form-group">
              <label
                for="method-text"
                className="col-form-label black">
                Method of cooking:
              </label>
              <textarea
                name="method"
                value={props.details.method}
                onChange={props.handleChange}
                onFocus={props.onFocus}
                required
                className="form-control"
                id="method-text">
              </textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn vote-button">Update Recipe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default EditRecipeModal;
