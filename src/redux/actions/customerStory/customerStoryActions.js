import { getCustomerStories } from "../../../api";
import { GET_CUSTOMER_STORIES_FAILURE, GET_CUSTOMER_STORIES_REQUEST, GET_CUSTOMER_STORIES_SUCCESS } from "../../actionsType/customerStory";

export const fetchCustomerStories=()=>({
    type: GET_CUSTOMER_STORIES_REQUEST,
});

export const fetchCustomerStoriesSuccess=(customerStories)=>({
    type: GET_CUSTOMER_STORIES_SUCCESS,
    payload: customerStories,
});

export const fetchCustomerStoriesFailure=(error)=>({
    type: GET_CUSTOMER_STORIES_FAILURE,
    payload: error,

});


export const GetStories=()=>{
    return async (dispatch)=>{
        dispatch(fetchCustomerStories());
        try {
            const response=await getCustomerStories();
            const data=response.data;
            dispatch(fetchCustomerStoriesSuccess(data));
            
        } catch (error) {
            dispatch(fetchCustomerStoriesFailure(error.message));
        }
    }
}