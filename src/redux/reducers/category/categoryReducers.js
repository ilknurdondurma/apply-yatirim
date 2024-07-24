const initialsState ={
    categories:[],
    loading:false,
    error:null
};

const categoryReducers = (state = initialsState, action) => {
    switch (action.type){
        case 'GET_CATEGORIES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_CATEGORIES_SUCCESS':
            return {
                ...state,
                loading:false,
                categories:action.payload
            }
        case 'GET_CATEGORIES_FAILURE':
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default categoryReducers;