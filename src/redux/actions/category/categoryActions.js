import { getCategories } from "../../../api";
import { GET_CATEGORIES_REQUEST,GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILURE } from "../../actionsType/category";

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

export const fetchCategories=()=>{
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