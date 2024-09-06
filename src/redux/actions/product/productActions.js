import { getAllProducts, getProductsById, addProduct, updateProduct, deleteProduct } from "../../../api";
import { GET_PRODUCTS_REQUEST , GET_PRODUCTS_SUCCESS,  GET_PRODUCTS_FAILURE, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, ADD_PRODUCT_SUCCESS } from "../../actionsType/product"; 


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
export const updateProductSuccess=(product)=>({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product,
})

export const deleteProductSuccess=(product)=>({
    type: DELETE_PRODUCT_SUCCESS,
    payload: product,
})

export const addProductSuccess=(product)=>({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
})
export const GetAllProducts=()=>{
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
export const GetProductById=(id)=>{
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
export const GetProductByProductId=(id)=>{
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
export const AddProduct = (newProduct) => {
    return async (dispatch) => {
      dispatch(fetchProductsRequest());
      try {
        const response = await addProduct(newProduct);
        const data = response.data;
        dispatch(addProductSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchProductsFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateProduct = (id,updatedProduct) => {
    return async (dispatch) => {
      dispatch(fetchProductsRequest());
      try {
        const response = await updateProduct(id ,updatedProduct);
        const data = response.data;
        dispatch(updateProductSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchProductsFailure(errorMessage));
      }
    };
  };
  
  export const DeleteProduct = (id) => {
    return async (dispatch) => {
      dispatch(fetchProductsRequest());
      try {
        await deleteProduct(id);
        dispatch(deleteProductSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchProductsFailure(errorMessage));
      }
    };
  };