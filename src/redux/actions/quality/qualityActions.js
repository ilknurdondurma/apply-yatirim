import { addQualiity, deleteQuality, getQualities, updateQuality } from "../../../api";
import { ADD_QUALITY_SUCCESS, DELETE_QUALITY_SUCCESS, GET_QUALITIES_FAILURE, GET_QUALITIES_REQUEST,GET_QUALITIES_SUCCESS, UPDATE_QUALITY_SUCCESS } from "../../actionsType/quality";

export const fetchQualitiesRequest=()=>({
    type:GET_QUALITIES_REQUEST
});
export const fetchQualitiesSuccess=(qualities)=>({
    type: GET_QUALITIES_SUCCESS,
    payload: qualities
});
export const fetchQualitiesFailure=(error)=>({
    type :GET_QUALITIES_FAILURE,
    payload:error
});
export const addQualitySuccess = (quality) => ({
    type: ADD_QUALITY_SUCCESS,
    payload: quality,
  });
  
  export const updateQualitySuccess = (quality) => ({
    type: UPDATE_QUALITY_SUCCESS,
    payload: quality,
  });
  
  export const deleteQualitySuccess = (id) => ({
    type: DELETE_QUALITY_SUCCESS,
    payload: { id },
  });

//------------------------


export const GetQualities=()=>{
    return async (dispatch)=>{
        dispatch(fetchQualitiesRequest());
        try {
            const response=await getQualities();
            const data=response.data;
            dispatch(fetchQualitiesSuccess(data));
            
        } catch (error) {
            dispatch(fetchQualitiesFailure(error.message));
        }
    }
};


export const AddQuality = (newQuality) => {
    return async (dispatch) => {
      dispatch(fetchQualitiesRequest());
      try {
        const response = await addQualiity(newQuality);
        const data = response.data;
        dispatch(addQualitySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchQualitiesFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateQuality = (id, updatedQuality) => {
    return async (dispatch) => {
      dispatch(fetchQualitiesRequest());
      try {
        const response = await updateQuality(id, updatedQuality);
        const data = response.data;
        dispatch(updateQualitySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchQualitiesFailure(errorMessage));
      }
    };
  };
  
  export const DeleteQuality = (id) => {
    return async (dispatch) => {
      dispatch(fetchQualitiesRequest());
      try {
        await deleteQuality(id);
        dispatch(deleteQualitySuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchQualitiesFailure(errorMessage));
      }
    };
  };