import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeReducers';
import contactReducers from './contact/contactReducers';
import aboutReducers from './about/aboutReducers';
import sidebarReducers from './sidebar/sidebarReducers';
import categoryReducers from './category/categoryReducers';
import productReducers from './product/productReducers';

const Reducers = combineReducers({
  theme: themeReducer,
  contact:contactReducers,
  about:aboutReducers,
  sidebar:sidebarReducers,
  category:categoryReducers,
  product:productReducers
  
});

export default Reducers;
 