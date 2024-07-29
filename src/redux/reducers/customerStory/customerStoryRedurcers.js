const initialStates={
    customerStories:[],
    loading:false,
    error:null
}

const customerStoryReducers=(state=initialStates ,action)=>{
    switch(action.type){
        case 'GET_CUSTOMER_STORIES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_CUSTOMER_STORIES_SUCCESS':
            return {
                ...state,
                loading: false,
                customerStories: action.payload
            }
        case 'GET_CUSTOMER_STORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}
export default customerStoryReducers;