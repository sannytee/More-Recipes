import React from 'react';
import {
  shallow
} from 'enzyme';
import { Spinner } from 'react-preloading-component';
import {
  MyRecipePage
} from '../../../components/MyRecipePage/index';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    user: MockData.userData.profile,
    actions: {
      logoutAction: () => {},
      getUserRecipes: () => {},
      deleteRecipeAction: () => Promise.resolve(),
      editRecipeAction: () => Promise.resolve(),
    },
    userRecipes: MockData.userRecipesSuccess.userRecipes,
    isLoading: false,
    pages: MockData.userRecipesSuccess.pages
  };

  return shallow(<MyRecipePage {...props} />);
};

localStorage.clear = () => {};
localStorage.getItem = () => {};

describe('MyRecipePage Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render message if user have no recipe', () => {
    const wrapper = setup();
    wrapper.setProps({ userRecipes: [] });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('You do not have any recipe');
  });

  it('should delete recipe when the delete button is clicked', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleDeletion');
    action.handleDeletion();
    expect(spy).toBeCalled();
  });

  it('should submit edit recipe form', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });


  it('should set state of input field', () => {
    const event = {
      target: { name: 'recipeName', value: 'Rice' }
    };
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleChange');
    action.handleChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('recipe').recipeName).toBe('Rice');
  });


  it('should clear error message when form input is focused on', () => {
    const wrapper = setup();
    wrapper.setState({ errorMessage: 'Invalid' });
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'onFocus');
    action.onFocus();
    expect(spy).toBeCalled();
    expect(wrapper.state('errorMessage')).toBe('');
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
