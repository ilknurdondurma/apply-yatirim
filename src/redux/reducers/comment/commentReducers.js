const initialStates={
    comments:[],
    loading:false,
    error:null
};

const commentReducers=(state = initialStates , action )=>{
    switch(action.type){
        case "GET_COMMENTS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "GET_COMMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                comments: action.payload
            }
        case "GET_COMMENTS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default commentReducers;