import React from 'react';
import { mount } from 'enzyme';
import { Spinner } from 'react-preloading-component';
import { MyRecipePage } from '../../../components/MyRecipePage';
import MockData from '../../__mocks__/actions/recipes';

let props;

jest.mock('../../../components/common/AuthHeader.jsx', () => jest.fn(() => <div />));
jest.mock('react-firebase-image-uploader', () => jest.fn(() => <div />));


const setup = () => {
  props = {
    user: MockData.userData.profile,
    actions: {
      logoutAction: () => {},
      getUserRecipes: () => {},
      deleteRecipeAction: jest.fn(() => Promise.resolve()),
      editRecipeAction: jest.fn(() => Promise.resolve()),
    },
    userRecipes: MockData.userRecipesSuccess.userRecipes,
    isLoading: false,
    pages: MockData.userRecipesSuccess.pages
  };

  return mount(<MyRecipePage {...props} />);
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
    const deleteButton = wrapper.find('#deleteButton');
    deleteButton.simulate('click');
    expect(wrapper.prop('actions').deleteRecipeAction).toBeCalled();
  });

  it('should handle submitting edit recipe form', () => {
    const wrapper = setup();
    const editRecipeForm = wrapper.find('#editRecipeForm');
    editRecipeForm.simulate('submit');
    expect(wrapper.prop('actions').editRecipeAction).toBeCalled();
  });


  it('should set state of input field', () => {
    const event = {
      target: { name: 'recipeName', value: 'Beans' }
    };
    const wrapper = setup();
    const editRecipeName = wrapper.find('#recipeName');
    editRecipeName.simulate('change', event);
    expect(wrapper.state('recipe').recipeName).toBe('Beans');
  });


  it('should clear error message when form input is focused on', () => {
    const wrapper = setup();
    wrapper.setState({ errorMessage: 'Invalid' });
    const editRecipeName = wrapper.find('#recipeName');
    editRecipeName.simulate('focus');
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
