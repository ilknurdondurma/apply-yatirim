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
        case "ADD_PRODUCT_SUCCESS":
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null,
            };
        case "UPDATE_PRODUCT_SUCCESS":
                return {
                    ...state,
                    products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                    ),
                    loading: false,
                    error: null,
                };
        case "DELETE_PRODUCT_SUCCESS":
                return {
                    ...state,
                    products: state.products.filter(product => product.id !== action.payload.id),
                    loading: false,
                    error: null,
                };
        default:
            return state;
    }

}
export default productReducers;