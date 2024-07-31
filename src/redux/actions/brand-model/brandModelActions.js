import { getBrandModels } from "../../../api";
import { GET_BRAND_MODELS_REQUEST,GET_BRAND_MODELS_SUCCESS , GET_BRAND_MODELS_FAILURE} from "../../actionsType/brand-model";

export const fetchBrandModelsRequest=()=>({
    type: GET_BRAND_MODELS_REQUEST,
});

export const fetchBrandModelsSuccess=(brandModels)=>({
    type: GET_BRAND_MODELS_SUCCESS,
    payload: brandModels,
});

export const fetchBrandModelsFailure=(error)=>({
    type: GET_BRAND_MODELS_FAILURE,
    payload: error,
});

export const GetBrandModels=()=>{
    return async (dispatch)=>{
        dispatch(fetchBrandModelsRequest());
        try {
            const response = await getBrandModels();
            const data = response.data;
            dispatch(fetchBrandModelsSuccess(data));
        } catch (error) {
            dispatch(fetchBrandModelsFailure(error));
        }
    }
}