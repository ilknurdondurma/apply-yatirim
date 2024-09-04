import { addCategory, deleteCategory, getCategories, updateCategory } from "../../../api";
import { GET_CATEGORIES_REQUEST,GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILURE, UPDATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, ADD_CATEGORY_SUCCESS } from "../../actionsType/category";

export const  fetchCategoriesRequest =()=>({
    type: GET_CATEGORIES_REQUEST
});

export const fetchCategoriesSuccess=(categories)=>({
    type:GET_CATEGORIES_SUCCESS,
    payload: categories
});

export const fetchCategoriesFailure=(error)=>({
    type: GET_CATEGORIES_FAILURE,
    payload: error
});
export const updateCategorySuccess=(category)=>({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
})

export const deleteCategorySuccess=(category)=>({
    type: DELETE_CATEGORY_SUCCESS,
    payload: category,
})

export const addCategorySuccess=(category)=>({
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
})
export const GetCategories=()=>{
    return async (dispatch)=>{
        dispatch(fetchCategoriesRequest());
        try{
            const response = await getCategories();
            const data=response.data;
            dispatch(fetchCategoriesSuccess(data));
        } catch(error){
            dispatch(fetchCategoriesFailure(error.message));
        }
    }
}
export const AddCategory = (newCategory) => {
    return async (dispatch) => {
      dispatch(fetchCategoriesRequest());
      try {
        const response = await addCategory(newCategory);
        const data = response.data;
        dispatch(addCategorySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCategoriesFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateCategory = (id,updatedCategory) => {
    return async (dispatch) => {
      dispatch(fetchCategoriesRequest());
      try {
        const response = await updateCategory(id ,updatedCategory);
        const data = response.data;
        dispatch(updateCategorySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCategoriesFailure(errorMessage));
      }
    };
  };
  
  export const DeleteCategory = (id) => {
    return async (dispatch) => {
      dispatch(fetchCategoriesRequest());
      try {
        await deleteCategory(id);
        dispatch(deleteCategorySuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCategoriesFailure(errorMessage));
      }
    };
  };