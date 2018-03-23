import { combineReducers } from 'redux';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';


const reducers = combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
});

export default reducers;
