/* eslint-disable no-unused-vars */
import React from 'react';

const DeleteRecipeModal = props => (
  <div
    className="modal fade"
    id="deleteModal"
    tabindex="-1"
    data-backdrop="static"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    style={{ display: 'none' }}
    aria-hidden="true">
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
          <button type="button" className="btn btn-danger">Delete</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteRecipeModal;
