const initialStates={
    models:[],
    loading:false,
    error:null
}

const modelReducers=(state=initialStates , action)=>{
    switch(action.type){
        case 'GET_MODELS_REQUEST':
            return {
               ...state,
                loading: true,
                error: null
            }
            
        case 'GET_MODELS_SUCCESS':
            return {
                loading: false,
                error: null,
                models: action.payload
            }
            
        case 'GET_MODELS_FAILURE':
            return {
                loading: false,
                error: action.payload
            }
        case 'ADD_MODEL_SUCCESS':
            return {
                loading: false,
                error: null,
                models: [...state.models, action.payload]
            }
            
        case 'UPDATE_MODEL_SUCCESS':  
            return {
                loading: false,
                error: null,
                models: state.models.map(model=>model.id===action.payload.id?action.payload:model)
            }
            
        case 'DELETE_MODEL_SUCCESS':
            return {
                loading: false,
                error: null,
                models: state.models.filter(model=>model.id!==action.payload.id)
            }
            
        default:
            return state;
    }
}
export default modelReducers;