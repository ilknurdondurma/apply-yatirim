import { addPropertyType, deletePropertyType, getPropertyTypes, updatePropertyType } from "../../../api";
import {GET_PROPERTY_TYPES_REQUEST , GET_PROPERTY_TYPES_SUCCESS,GET_PROPERTY_TYPES_FAILURE, ADD_PROPERTY_TYPE_SUCCESS, UPDATE_PROPERTY_TYPE_SUCCESS, DELETE_PROPERTY_TYPE_SUCCESS} from "../../actionsType/propertyType"

export const fetchPropertyTypesRequest=()=>({
    type: GET_PROPERTY_TYPES_REQUEST,
});

export const fetchPropertyTypesSuccess=(propertyTypes)=>({
    type: GET_PROPERTY_TYPES_SUCCESS,
    payload: propertyTypes,
});

export const fetchPropertyTypesFailure=(error)=>({
    type: GET_PROPERTY_TYPES_FAILURE,
    payload: error,
});

export const addPropertyTypeSuccess=(propertyType)=>({
    type: ADD_PROPERTY_TYPE_SUCCESS,
    payload: propertyType,
});

export const updatePropertyTypeSuccess=(propertyType)=>({
    type: UPDATE_PROPERTY_TYPE_SUCCESS,
    payload: propertyType,
});

export const deletePropertyTypeSuccess=(propertyType)=>({
    type: DELETE_PROPERTY_TYPE_SUCCESS,
    payload: propertyType,
});

export const GetPropertyTypes=()=>{
    return async (dispatch) => {
        dispatch(fetchPropertyTypesRequest());
        try {
            const response = await getPropertyTypes();
            dispatch(fetchPropertyTypesSuccess(response.data));
        } catch (error) {
            dispatch(fetchPropertyTypesFailure(error.message));
        }
    }
 
}
export const AddPropertyType = (newPropertyType) => {
    return async (dispatch) => {
      dispatch(fetchPropertyTypesRequest());
      try {
        const response = await addPropertyType(newPropertyType);
        const data = response.data;
        dispatch(addPropertyTypeSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertyTypesFailure(errorMessage));
      }
    };
  };
  export const UpdatePropertyType = (id,updatedPropertyType) => {
    return async (dispatch) => {
      dispatch(fetchPropertyTypesRequest());
      try {
        const response = await updatePropertyType(id ,updatedPropertyType);
        const data = response.data;
        dispatch(updatePropertyTypeSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertyTypesFailure(errorMessage));
      }
    };
  };
  export const DeletePropertyType = (id) => {
    return async (dispatch) => {
      dispatch(fetchPropertyTypesRequest());
      try {
        await deletePropertyType(id);
        dispatch(deletePropertyTypeSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertyTypesFailure(errorMessage));
      }
    };
  };