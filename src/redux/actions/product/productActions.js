import { getAllProducts, getProductsByCategoryId, getProductsById } from "../../../api";
import { GET_PRODUCTS_REQUEST , GET_PRODUCTS_SUCCESS,  GET_PRODUCTS_FAILURE } from "../../actionsType/product"; 


export const fetchProductsRequest=()=>({
    type: GET_PRODUCTS_REQUEST
});

export const fetchProductsSuccess=(products)=>({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailure=(error)=>({
    type: GET_PRODUCTS_FAILURE,
    payload: error
});

export const fetchAllProduct=()=>{
    return async (dispatch)=>{
        dispatch(fetchProductsRequest());
        try {
            const response=await getAllProducts();
            const data=response.data;
            dispatch(fetchProductsSuccess(data));
            
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    }
   
}
export const fetchProductById=(id)=>{
    return async (dispatch)=>{
        dispatch(fetchProductsRequest());
        try {
            const response=await getProductsById(id);
            const data=response.data;
            dispatch(fetchProductsSuccess(data));
            
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    }
   
}
export const fetchProductByCategoryId=(id)=>{
    return async (dispatch)=>{
        dispatch(fetchProductsRequest());
        try {
            const response=await getProductsByCategoryId(id);
            const data=response.data;
            dispatch(fetchProductsSuccess(data));
            
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    }
   
}