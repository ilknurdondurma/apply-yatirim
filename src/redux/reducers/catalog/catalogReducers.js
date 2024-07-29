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
        default:
            return state;
    }
}
export default catalogReducers;