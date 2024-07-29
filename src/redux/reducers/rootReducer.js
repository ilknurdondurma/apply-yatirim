import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeReducers';
import contactReducers from './contact/contactReducers';
import aboutReducers from './about/aboutReducers';
import sidebarReducers from './sidebar/sidebarReducers';
import categoryReducers from './category/categoryReducers';
import productReducers from './product/productReducers';
import serviceReducers from './service/serviceReducers';
import catalogReducers from './catalog/catalogReducers';
import customerStoryReducers from './customerStory/customerStoryRedurcers';
import teamReducers from './team/teamReducers';
import qualityReducers from './quality/qualityReducers';

const Reducers = combineReducers({
  theme: themeReducer,
  contact:contactReducers,
  about:aboutReducers,
  sidebar:sidebarReducers,
  category:categoryReducers,
  product:productReducers,
  service:serviceReducers,
  catalog:catalogReducers,
  story:customerStoryReducers,
  team:teamReducers,
  quality:qualityReducers
  
});

export default Reducers;
 