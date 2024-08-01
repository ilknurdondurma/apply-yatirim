import {  addBrand, deleteBrand, getBrands, updateBrand } from "../../../api";
import { GET_BRANDS_REQUEST,GET_BRANDS_SUCCESS , GET_BRANDS_FAILURE ,ADD_BRAND_SUCCESS ,UPDATE_BRAND_SUCCESS, DELETE_BRAND_SUCCESS} from "../../actionsType/brand";

export const fetchBrandsRequest=()=>({
    type: GET_BRANDS_REQUEST,
});

export const fetchBrandsSuccess=(brands)=>({
    type: GET_BRANDS_SUCCESS,
    payload: brands,
});

export const fetchBrandsFailure=(error)=>({
    type: GET_BRANDS_FAILURE,
    payload: error,
});
export const addBrandSuccess = (brand) => ({
    type: ADD_BRAND_SUCCESS,
    payload: brand,
  });
  
  export const updateBrandSuccess = (brand) => ({
    type: UPDATE_BRAND_SUCCESS,
    payload: brand,
  });
  
  export const deleteBrandSuccess = (id) => ({
    type: DELETE_BRAND_SUCCESS,
    payload: { id },
  });

export const GetBrands=()=>{
    return async (dispatch)=>{
        dispatch(fetchBrandsRequest());
        try {
            const response = await getBrands();
            const data = response.data;
            dispatch(fetchBrandsSuccess(data));
        } catch (error) {
            dispatch(fetchBrandsFailure(error));
        }
    }
}
export const AddBrand = (newBrand) => {
    return async (dispatch) => {
      dispatch(fetchBrandsRequest());
      try {
        const response = await addBrand(newBrand);
        const data = response.data;
        dispatch(addBrandSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchBrandsFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateBrand = (id, updatedBrand) => {
    return async (dispatch) => {
      dispatch(fetchBrandsRequest());
      try {
        const response = await updateBrand(id, updatedBrand);
        const data = response.data;
        dispatch(updateBrandSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchBrandsFailure(errorMessage));
      }
    };
  };
  
  export const DeleteBrand = (id) => {
    return async (dispatch) => {
      dispatch(fetchBrandsRequest());
      try {
        await deleteBrand(id);
        dispatch(deleteBrandSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchBrandsFailure(errorMessage));
      }
    };
  };