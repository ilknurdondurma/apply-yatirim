const initialStates={
    teams:[],
    loading:false,
    error:null
};

const teamReducers=(state = initialStates , action )=>{
    switch(action.type){
        case 'GET_TEAMS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'GET_TEAMS_SUCCESS':
            return {
                ...state,
                loading: false,
                teams: action.payload
            }
        case 'GET_TEAMS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default teamReducers;