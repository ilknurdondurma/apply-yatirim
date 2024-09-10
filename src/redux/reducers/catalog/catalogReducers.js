const initialState={
    catalogs:[],
    loading:false,
    error:null
};

const catalogReducers=(state = initialState , action )=>{
    switch (action.type){
        case 'GET_CATALOGS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_CATALOGS_SUCCESS':
            return {
                ...state,
                loading: false,
                catalogs: action.payload
            }
        case 'GET_CATALOGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ADD_CATALOG_SUCCESS':
            return {
                ...state,
                catalogs: [...state.catalogs, action.payload],
                loading: false,
                error: null
            }
            
        case 'UPDATE_CATALOG_SUCCESS':
            return {
                ...state,
                catalogs: state.catalogs.map(catalog =>
                catalog.id === action.payload.id? action.payload : catalog
                ),
                loading: false,
                error: null,
            };
        case 'DELETE_CATALOG_SUCCESS':
            return {
                ...state,
                catalogs: state.catalogs.filter(catalog => catalog.id!== action.payload.id),
                loading: false,
                error: null,
            }
        default:
            return state;
    }
}
export default catalogReducers;