import { addCompatibleModel, deleteCompatibleModel, getCompatibleModels, updateCompatibleModel } from "../../../api";
import { ADD_COMPATIBLE_MODEL_SUCCESS, DELETE_COMPATIBLE_MODEL_SUCCESS, GET_COMPATIBLE_MODELS_FAILURE, GET_COMPATIBLE_MODELS_REQUEST, GET_COMPATIBLE_MODELS_SUCCESS, UPDATE_COMPATIBLE_MODEL_SUCCESS }from "../../actionsType/compatibleModel"
export const fetchCompatibleModelsRequest=()=>( {
        type:GET_COMPATIBLE_MODELS_REQUEST,
})

export const fetchCompatibleModelsSuccess=(compatibleModels)=>({
        type:GET_COMPATIBLE_MODELS_SUCCESS,
        payload:compatibleModels,
})

export const fetchCompatibleModelsFailure=(error)=>({
        type:GET_COMPATIBLE_MODELS_FAILURE,
        payload:error,
})
export const addCompatibleModelSuccess=(compatibleModel)=>({
    type: ADD_COMPATIBLE_MODEL_SUCCESS,
    payload: compatibleModel,
});

export const updateCompatibleModelSuccess=(compatibleModel)=>({
    type: UPDATE_COMPATIBLE_MODEL_SUCCESS,
    payload: compatibleModel,
});

export const deleteCompatibleModelSuccess=(compatibleModelId)=>({
    type: DELETE_COMPATIBLE_MODEL_SUCCESS,
    payload: compatibleModelId,
});

export const GetCompatibleModels=()=>{
    return async (dispatch)=>{
        dispatch(fetchCompatibleModelsRequest());
        try{
            const response = await getCompatibleModels();
            const data=response.data;
            dispatch(fetchCompatibleModelsSuccess(data));
        } catch (error) {
            dispatch(fetchCompatibleModelsFailure(error.message));
        }
    }
}

export const AddCompatibleModel = (newCompatibleModel) => {
    return async (dispatch) => {
      dispatch(fetchCompatibleModelsRequest());
      try {
        const response = await addCompatibleModel(newCompatibleModel);
        const data = response.data;
        dispatch(addCompatibleModelSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCompatibleModelsFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateCompatibleModel = (id,updatedCompatibleModel) => {
    return async (dispatch) => {
      dispatch(fetchCompatibleModelsRequest());
      try {
        const response = await updateCompatibleModel(id ,updatedCompatibleModel);
        const data = response.data;
        dispatch(updateCompatibleModelSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCompatibleModelsFailure(errorMessage));
      }
    };
  };
  
  export const DeleteCompatibleModel = (id) => {
    return async (dispatch) => {
      dispatch(fetchCompatibleModelsRequest());
      try {
        await deleteCompatibleModel(id);
        dispatch(deleteCompatibleModelSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCompatibleModelsFailure(errorMessage));
      }
    };
  };