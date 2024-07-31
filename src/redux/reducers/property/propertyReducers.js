const initialStates={
    properties:[],
    loading:false,
    error:null
}
const propertyReducers=(state=initialStates ,action)=>{
    switch(action.type){
        case "GET_PROPERTIES_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "GET_PROPERTIES_SUCCESS":
            return {
                ...state,
                properties: action.payload,
                loading: false,
            }
        case "GET_PROPERTIES_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }


}

export default propertyReducers;