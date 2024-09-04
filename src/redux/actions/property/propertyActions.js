import { addProperty, deleteProperty, getProperties, updateProperty } from "../../../api";
import { ADD_PROPERTY_SUCCESS, DELETE_PROPERTY_SUCCESS, GET_PROPERTIES_FAILURE, GET_PROPERTIES_REQUEST, GET_PROPERTIES_SUCCESS, UPDATE_PROPERTY_SUCCESS } from "../../actionsType/property";

export const fetchPropertiesRequest=()=>({
    type: GET_PROPERTIES_REQUEST,
});

export const fetchPropertiesSuccess=(properties)=>({
    type: GET_PROPERTIES_SUCCESS,
    payload: properties,
});

export const fetchPropertiesFailure=(error)=>({
    type: GET_PROPERTIES_FAILURE,
    payload: error,
});
export const addPropertySuccess=(property)=>({
    type: ADD_PROPERTY_SUCCESS,
    payload: property,
});

export const updatePropertySuccess=(property)=>({
    type: UPDATE_PROPERTY_SUCCESS,
    payload: property,
});

export const deletePropertySuccess=(propertyId)=>({
    type: DELETE_PROPERTY_SUCCESS,
    payload: propertyId,
});

export const GetProperties=()=>{
    return async (dispatch)=>{
        dispatch(fetchPropertiesRequest());
        try{
            const response = await getProperties();
            const data=response.data;
            dispatch(fetchPropertiesSuccess(data));
        } catch (error) {
            dispatch(fetchPropertiesFailure(error.message));
        }
    }
}

export const AddProperty = (newProperty) => {
    return async (dispatch) => {
      dispatch(fetchPropertiesRequest());
      try {
        const response = await addProperty(newProperty);
        const data = response.data;
        dispatch(addPropertySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertiesFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateProperty = (id,updatedProperty) => {
    return async (dispatch) => {
      dispatch(fetchPropertiesRequest());
      try {
        const response = await updateProperty(id ,updatedProperty);
        const data = response.data;
        dispatch(updatePropertySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertiesFailure(errorMessage));
      }
    };
  };
  
  export const DeleteProperty = (id) => {
    return async (dispatch) => {
      dispatch(fetchPropertiesRequest());
      try {
        await deleteProperty(id);
        dispatch(deletePropertySuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchPropertiesFailure(errorMessage));
      }
    };
  };