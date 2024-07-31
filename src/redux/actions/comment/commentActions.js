import { getComments } from "../../../api";
import {GET_COMMENTS_REQUEST,GET_COMMENTS_SUCCESS,GET_COMMENTS_FAILURE} from "../../actionsType/comment/index"

export const fetchCommentsRequest=()=>({
    type:GET_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess=(comments)=>({
    type: GET_COMMENTS_SUCCESS,
    payload: comments,
});
export const fetchCommentsFailure =(error)=>({
    type: GET_COMMENTS_FAILURE,
    payload: error,
});

export const GetComments=()=>{
    return async (dispatch)=>{
        dispatch(fetchCommentsRequest());
        try{
            const response = await getComments();
            const data = response.data;
            dispatch(fetchCommentsSuccess(data));
        }catch(error){
            dispatch(fetchCommentsFailure(error));
        }
    }
}