import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'react-preloading-component';
import { ProfilePage } from '../../../components/ProfilePage/index';
import MockData from '../../__mocks__/actions/recipes';


let props;

const setup = () => {
  props = {
    user: MockData.userData.profile,
    actions: {
      getUserFavRecipes: () => {},
      getUserRecipes: () => {},
      getUserProfile: () => {},
      updateUserProfile: () => {}
    },
    myRecipesCount: 3,
    favRecipesCount: 4,
    createdAt: '2018-02-20T10:11:25.020Z',
    isLoading: false,
    profile: MockData.userData.profile
  };

  return shallow(<ProfilePage {...props} />);
};


localStorage.clear = () => {};
localStorage.getItem = () => {};
localStorage.setItem = () => {};

describe('ProfilePage Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state of isUploading and progress when image upload starts', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const startUpload = jest.spyOn(action, 'handleUploadStart');
    action.handleUploadStart();
    expect(startUpload).toBeCalled();
    expect(wrapper.state('isUploading')).toBe(true);
    expect(wrapper.state('progress')).toBe(0);
  });

  it('should track state of progress when image is uploading', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const trackProgress = jest.spyOn(action, 'handleProgress');
    action.handleProgress(20);
    expect(trackProgress).toBeCalled();
    expect(wrapper.state('progress')).toBe(20);
  });

  it('should render loader when `isLoading` is true', () => {
    const wrapper = setup();
    wrapper.setProps({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Spinner).length).toBe(1);
  });
});
