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
        case 'UPDATE_ABOUT_SUCCESS':
            return {
                ...state,
                abouts: state.abouts.map(about=>about.id===action.payload.id?action.payload:about),
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export default aboutReducers;