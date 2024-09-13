const initialsState ={
    sectors:[],
    loading:false,
    error:null
};

const sectorReducers = (state = initialsState, action) => {
    switch (action.type){
        case 'GET_SECTORS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_SECTORS_SUCCESS':
            return {
                ...state,
                loading:false,
                sectors:action.payload
            }
        case 'GET_SECTORS_FAILURE':
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        case "ADD_SECTOR_SUCCESS":
                return {
                    ...state,
                    sectors: [...state.sectors, action.payload],
                    loading: false,
                    error: null,
                };
        case "UPDATE_SECTOR_SUCCESS":
                return {
                    ...state,
                    sectors: state.sectors.map(sector =>
                    sector.id === action.payload.id ? action.payload : sector
                    ),
                    loading: false,
                    error: null,
                };
        case "DELETE_SECTOR_SUCCESS":
                return {
                    ...state,
                    sectors: state.sectors.filter(sector => sector.id !== action.payload.id),
                    loading: false,
                    error: null,
                };
        default:
            return state;
    }
}
export default sectorReducers;