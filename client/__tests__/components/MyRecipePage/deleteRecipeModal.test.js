import React from 'react';
import { shallow } from 'enzyme';
import DeleteRecipeModal from '../../../components/MyRecipePage/deleteRecipeModal';

describe('DeleteRecipeModal Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DeleteRecipeModal />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('button').at(1).text()).toBe('Delete');
  });
});
