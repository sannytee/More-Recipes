import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/common/header';

describe('Header Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
  });
});
