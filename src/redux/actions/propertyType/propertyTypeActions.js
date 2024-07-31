import { getPropertyTypes } from "../../../api";
import {GET_PROPERTY_TYPES_REQUEST , GET_PROPERTY_TYPES_SUCCESS,GET_PROPERTY_TYPES_FAILURE} from "../../actionsType/propertyType"

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