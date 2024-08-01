const initialStates={
    brands:[],
    loading:false,
    error:null
}

const brandReducers=(state=initialStates , action)=>{
    switch(action.type){
        case 'GET_BRANDS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_BRANDS_SUCCESS':
            return {
                loading: false,
                error: null,
                brands: action.payload
            }
        case 'GET_BRANDS_FAILURE':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export default brandReducers;