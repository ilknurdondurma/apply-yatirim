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
        case "ADD_TEAM_SUCCESS":
                return {
                    ...state,
                    teams: [...state.teams, action.payload],
                    loading: false,
                    error: null,
                };
        case "UPDATE_TEAM_SUCCESS":
                return {
                    ...state,
                    teams: state.teams.map(team =>
                    team.id === action.payload.id ? action.payload : team
                    ),
                    loading: false,
                    error: null,
                };
        case "DELETE_TEAM_SUCCESS":
                return {
                    ...state,
                    teams: state.teams.filter(team => team.id !== action.payload.id),
                    loading: false,
                    error: null,
                };
        default:
            return state;
    }
}
export default teamReducers;