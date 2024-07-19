const initialsState ={
    abouts:[],
    loading:false,
    error:null
};

const aboutReducers = (state = initialsState, action) => {
    switch (action.type){
        case 'GET_ABOUTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_ABOUTS_SUCCESS':
            return {
                ...state,
                loading:false,
                abouts:action.payload
            }
        case 'GET_ABOUTS_FAILURE':
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default aboutReducers;