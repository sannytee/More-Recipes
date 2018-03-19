/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';

const propTypes = {
  handleDeletion: PropTypes.func.isRequired
};

const DeleteRecipeModal = props => (
  <div
    className="modal fade"
    id="deleteModal"
    tabIndex="-1"
    data-backdrop="static"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    style={{ display: 'none' }}
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header black">
          <h5 className="modal-title black" id="deleteModalLabel">Delete recipe</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          This action cannot be reversed, proceed with caution.
        </div>
        <div className="modal-footer">
          <button
            id="deleteButton"
            type="button"
            onClick={props.handleDeletion}
            className="btn btn-danger"
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
          Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

DeleteRecipeModal.propTypes = propTypes;

export default DeleteRecipeModal;
