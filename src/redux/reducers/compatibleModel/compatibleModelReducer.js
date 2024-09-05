const initialStates={
    compatibleModels:[],
    loading:false,
    error:null
};
const compatibleModelReducers=(state=initialStates , action)=>{
    switch(action.type){
        case 'GET_COMPATIBLE_MODELS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_COMPATIBLE_MODELS_SUCCESS':
            return {
                ...state,
                compatibleModels: action.payload,
                loading: false,
            }
        case 'GET_COMPATIBLE_MODELS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ADD_COMPATIBLE_MODELS_SUCCESS':
            return {
                compatibleModels: [...state.compatibleModels, action.payload],
                loading: false,
                error: null
            }
            
        case 'UPDATE_COMPATIBLE_MODELS_SUCCESS':
            return {
                ...state,
                compatibleModels: state.compatibleModels.map(compatibleModel=>compatibleModel.id===action.payload.id?action.payload:compatibleModel),
                loading: false,
                error: null
            }
            
        case 'DELETE_COMPATIBLE_MODELS_SUCCESS':
            return {
                ...state,
                compatibleModels: state.compatibleModels.filter(compatibleModel=>compatibleModel.id!==action.payload.id),
                loading: false,
                error: null
            }
        default:
            return state;
 };
};
export default compatibleModelReducers;