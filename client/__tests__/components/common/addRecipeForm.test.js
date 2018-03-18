import React from 'react';
import { shallow } from 'enzyme';
import AddRecipeForm from '../../../components/common/addRecipeForm';


let props;

const setup = () => {
  props = {
    errorMessage: '',
    handleSubmit: () => {},
    handleChange: () => {},
    onFocus: () => {},
    isUploading: false,
    progress: 0,
    handleProgress: () => {},
    handleUploadStart: () => {},
    handleUploadSuccess: () => {},
    notReady: true,
    mealType: '',
  };

  return shallow(<AddRecipeForm {...props} />);
};

describe('AddRecipeForm Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render error if error exists', () => {
    const wrapper = setup();
    wrapper.setProps({ errorMessage: 'select a meal type' });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').text()).toBe('select a meal type');
  });
});
