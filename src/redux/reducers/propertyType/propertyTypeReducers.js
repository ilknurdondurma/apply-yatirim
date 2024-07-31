const initialStates={
    propertyTypes:[],
    loading:false,
    eroor:null
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
        default:
            return state;
    }
};

export default propertyTypeReducers;