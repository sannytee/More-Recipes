import React, { PropTypes } from 'react';
import ReactPaginate from 'react-paginate';

const propTypes = {
  handlePaginationChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

const Paginate = props => (
  <div className="container">
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel={<a href="">...</a>}
      breakClassName="page-link"
      onPageChange={props.handlePaginationChange}
      pageCount={props.page}
      containerClassName="pagination custom-pagination"
      pageLinkClassName="page-link"
      nextLinkClassName="page-link"
      previousLinkClassName="page-link"
      disabledClassName="disabled"
      pageClassName="page-item"
      previousClassName="page-item"
      nextClassName="page-item"
      activeClassName="active"
      subContainerClassName="pages pagination"
    />
  </div>
);

Paginate.propTypes = propTypes;

export default Paginate;

