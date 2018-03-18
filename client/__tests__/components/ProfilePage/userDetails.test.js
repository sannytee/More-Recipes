import React from 'react';
import { shallow } from 'enzyme';
import UserDetails from '../../../components/ProfilePage/userDetails';

let props;

const setup = () => {
  props = {
    username: 'sannitywo',
    email: 'sanni@test.com',
    myRecipesCount: 3,
    favRecipesCount: 4,
    createdAt: '2018-02-20T10:11:25.020Z',
  };

  return shallow(<UserDetails {...props} />);
};

describe('UserDetails Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').length).toBe(5);
  });
});
