import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/common/Footer';

describe('Footer Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('strong').length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('footer').length).toBe(1);
  });
});
