const initialStates={
    products: [],
    loading:false,
    error:null
}

const productReducers=(state =initialStates , action )=>{
    switch(action.type){
        case 'GET_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading:false,
                products:action.payload
            }
        case 'GET_PRODUCTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}
export default productReducers;