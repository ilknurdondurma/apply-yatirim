const initialStates={
    brandModels:[],
    loading:false,
    error:null
}

const brandModelReducers=(state=initialStates , action)=>{
    switch(action.type){
        case 'GET_BRAND_MODELS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_BRAND_MODELS_SUCCESS':
            return {
                loading: false,
                error: null,
                brandModels: action.payload
            }
        case 'GET_BRAND_MODELS_FAILURE':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export default brandModelReducers;