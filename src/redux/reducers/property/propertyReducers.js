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
        case "ADD_PROPERTY_SUCCESS":
            return {
                ...state,
                properties: [...state.properties, action.payload],
                loading: false,
                error: null,
            };
            
        case "UPDATE_PROPERTY_SUCCESS":
            return {
                ...state,
                properties: state.properties.map(property =>
                    property.id === action.payload.id? action.payload : property
                ),
                loading: false,
                error: null,
            };
            
        case "DELETE_PROPERTY_SUCCESS": 
            return {
                ...state,
                    properties: state.properties.filter(property => property.id!== action.payload.id),
                    loading: false,
                    error: null,
                };
                    default:
            return state;
    }


}

export default propertyReducers;