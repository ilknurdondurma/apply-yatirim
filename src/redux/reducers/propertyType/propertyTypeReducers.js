const initialStates={
    propertyTypes:[],
    loading:false,
    error:null
};

const propertyTypeReducers=(state=initialStates , action)=>{
    switch(action.type){
        case 'GET_PROPERTY_TYPES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_PROPERTY_TYPES_SUCCESS':
            return {
                ...state,
                loading: false,
                propertyTypes: action.payload
            }
        case 'GET_PROPERTY_TYPES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ADD_PROPERTY_TYPE_SUCCESS':
            return {
                ...state,
                propertyTypes: [...state.propertyTypes, action.payload],
                loading: false,
                error: null,
            }
        case 'UPDATE_PROPERTY_TYPE_SUCCESS':
            return {
                ...state,
                propertyTypes: state.propertyTypes.map(propertyType=>propertyType.id===action.payload.id?action.payload:propertyType),
                loading: false,
                error: null,
            }
        case 'DELETE_PROPERTY_TYPE_SUCCESS':
            return {
                ...state,
                propertyTypes: state.propertyTypes.filter(propertyType=>propertyType.id!==action.payload.id),
                loading: false,
                error: null,
            }
            
        default:
            return state;
    }
};

export default propertyTypeReducers;