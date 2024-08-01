import { addModel, deleteModel, getModels, updateModel } from "../../../api";
import { ADD_MODEL_SUCCESS, DELETE_MODEL_SUCCESS, GET_MODELS_FAILURE, GET_MODELS_REQUEST, GET_MODELS_SUCCESS, UPDATE_MODEL_SUCCESS } from "../../actionsType/model";

export const fetchModelsRequest=()=>({
    type: GET_MODELS_REQUEST,

});
export const fetchModelsSuccess=(models)=>({
    type: GET_MODELS_SUCCESS,
    payload: models,
});
export const fetchModelsFailure=(error)=>({
    type: GET_MODELS_FAILURE,
    payload: error,
});
export const addModelSuccess = (model) => ({
    type: ADD_MODEL_SUCCESS,
    payload: model,
  });
  
  export const updateModelSuccess = (model) => ({
    type: UPDATE_MODEL_SUCCESS,
    payload: model,
  });
  
  export const deleteModelSuccess = (id) => ({
    type: DELETE_MODEL_SUCCESS,
    payload: { id },
  });
  


export const GetModels=()=>{
    return async (dispatch)=>{
        dispatch(fetchModelsRequest());
        try {
            const response=await getModels();
            const data=response.data;
            dispatch(fetchModelsSuccess(data));
            
        } catch (error) {
            dispatch(fetchModelsFailure(error.message));
        }
    }
   
}
export const AddModel = (newModel) => {
    return async (dispatch) => {
      dispatch(fetchModelsRequest());
      try {
        const response = await addModel(newModel);
        const data = response.data;
        dispatch(addModelSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchModelsFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateModel = (id, updatedModel) => {
    return async (dispatch) => {
      dispatch(fetchModelsRequest());
      try {
        const response = await updateModel(id, updatedModel);
        const data = response.data;
        dispatch(updateModelSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchModelsFailure(errorMessage));
      }
    };
  };
  
  export const DeleteModel = (id) => {
    return async (dispatch) => {
      dispatch(fetchModelsRequest());
      try {
        await deleteModel(id);
        dispatch(deleteModelSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchModelsFailure(errorMessage));
      }
    };
  };