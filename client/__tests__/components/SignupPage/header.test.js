import React from 'react';
import { mount } from 'enzyme';
import Header from '../../../components/SignupPage/header';


describe('Header Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
