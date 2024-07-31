import { getProperties } from "../../../api";
import { GET_PROPERTIES_FAILURE, GET_PROPERTIES_REQUEST, GET_PROPERTIES_SUCCESS } from "../../actionsType/property";

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