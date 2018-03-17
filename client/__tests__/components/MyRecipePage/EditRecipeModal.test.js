import React from 'react';
import { shallow } from 'enzyme';
import EditRecipeModal from '../../../components/MyRecipePage/EditRecipeModal';
import MockData from '../../__mocks__/actions/recipes';


let props;

const setup = () => {
  props = {
    errorMessage: '',
    handleSubmit: () => {},
    handleChange: () => {},
    onFocus: () => {},
    onProgress: () => {},
    startUpload: () => {},
    upload: () => {},
    isUploading: false,
    progress: 0,
    details: MockData.recipeData,
    storageRef: {
      firebase: {
        storage: jest.fn()
      }
    }
  };

  return shallow(<EditRecipeModal {...props} />);
};


describe('EditRecipeModal Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5').text()).toBe('Edit Recipe');
  });

  it('should render error if error exists', () => {
    const wrapper = setup();
    wrapper.setProps({ errorMessage: 'Field cannot be empty' });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('div.alert').text()).toBe('Field cannot be empty');
  });

  it('should render loader image is still uploading', () => {
    const wrapper = setup();
    wrapper.setProps({
      isUploading: true,
      progress: 70
    });
    expect(wrapper).toMatchSnapshot();
  });
});
