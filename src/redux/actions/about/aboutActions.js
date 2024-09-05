import { getAbouts, updateAbout } from '../../../api';
import {GET_ABOUTS_REQUEST,GET_ABOUTS_SUCCESS,GET_ABOUTS_FAILURE, UPDATE_ABOUT_SUCCESS} from '../../actionsType/about'

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
export const updateAboutSuccess = (about) => ({
    type: UPDATE_ABOUT_SUCCESS,
    payload: about,
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
export const UpdateAbout = (id, about) => {
    return async (dispatch) => {
        dispatch(fetchAboutsRequest());
        try {
          const response = await updateAbout(id, about);
          const data = response.data;
          dispatch(updateAboutSuccess(data));
        } catch (error) {
          const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
          dispatch(fetchAboutsFailure(errorMessage));
        }
      };
  };


