import React from 'react';
import { shallow } from 'enzyme';
import AppComponent from '../../components/app';

describe('App Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AppComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
