import { getAbouts } from '../../../api';
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

export const fetchAbouts=()=>{
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



const aboutActions ={fetchAboutsRequest,fetchAboutsSuccess, fetchAboutsFailure}; // ilgili ekşınlar buraya tek çatı altında
export default aboutActions;