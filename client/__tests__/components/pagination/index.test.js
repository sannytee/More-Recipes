import React from 'react';
import { shallow } from 'enzyme';
import Paginate from '../../../components/pagination/index';


let props;

const setup = () => {
  props = {
    handlePaginationChange: () => {},
    page: 2,
  };

  return shallow(<Paginate {...props} />);
};

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
