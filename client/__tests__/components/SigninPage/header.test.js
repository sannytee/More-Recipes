import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/SigninPage/Header';

describe('Header Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
