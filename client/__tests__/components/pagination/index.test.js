import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../components/pagination';


let props;

const setup = () => {
  props = {
    handlePaginationChange: () => {},
    page: 2,
  };

  return shallow(<Pagination {...props} />);
};

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
