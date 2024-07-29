import { getAbouts, updateAbout } from '../../../api';
import {GET_ABOUTS_REQUEST,GET_ABOUTS_SUCCESS,GET_ABOUTS_FAILURE} from '../../actionsType/about'

export const fetchAboutsRequest =()=>({
    type: GET_ABOUTS_REQUEST
});

export const fetchAboutsSuccess=(abouts)=>({
    type: GET_ABOUTS_SUCCESS,
    payload: abouts
});

export const fetchAboutsFailure=(error)=>({
    type: GET_ABOUTS_FAILURE,
    payload: error
});

export const GetAbouts=()=>{
    return async (dispatch)=>{
        dispatch(fetchAboutsRequest());
        try{
            const response=await getAbouts();
            const data= response.data;
            dispatch(fetchAboutsSuccess(data));
        } catch (error){
            dispatch(fetchAboutsFailure(error.message));
        }
    }
};
export const UpdateAbout = (about) => {
    return async (dispatch) => {
      try {
        await updateAbout(about);
        dispatch(GetAbouts());
      } catch (error) {
        console.error("Failed to update about:", error);
      }
    };
  };


