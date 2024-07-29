const initialStates={
    qualities:[],
    loading:false,
    error:null
};

const qualityReducers=(state = initialStates , action )=>{
    switch(action.type){
        case 'GET_QUALITIES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_QUALITIES_SUCCESS':
            return {
                ...state,
                loading: false,
                qualities: action.payload
            }
        case 'GET_QUALITIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "ADD_QUALITY_SUCCESS":
            return {
                ...state,
                qualities: [...state.qualities, action.payload],
                loading: false,
                error: null,
            };
            case "UPDATE_QUALITY_SUCCESS":
            return {
                ...state,
                qualities: state.qualities.map(quality =>
                quality.id === action.payload.id ? action.payload : quality
                ),
                loading: false,
                error: null,
            };
            case "DELETE_QUALITY_SUCCESS":
            return {
                ...state,
                qualities: state.qualities.filter(quality => quality.id !== action.payload.id),
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export default qualityReducers;