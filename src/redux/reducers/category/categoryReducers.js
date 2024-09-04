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
        case "ADD_CATEGORY_SUCCESS":
                return {
                    ...state,
                    categories: [...state.categories, action.payload],
                    loading: false,
                    error: null,
                };
        case "UPDATE_CATEGORY_SUCCESS":
                return {
                    ...state,
                    categories: state.categories.map(category =>
                    category.id === action.payload.id ? action.payload : category
                    ),
                    loading: false,
                    error: null,
                };
        case "DELETE_CATEGORY_SUCCESS":
                return {
                    ...state,
                    categories: state.categories.filter(category => category.id !== action.payload.id),
                    loading: false,
                    error: null,
                };
        default:
            return state;
    }
}
export default categoryReducers;