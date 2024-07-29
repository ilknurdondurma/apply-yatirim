import { getTeams } from "../../../api";
import { GET_TEAMS_FAILURE, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS } from "../../actionsType/team";

export const fetchTeamRequest=()=>({
    type: GET_TEAMS_REQUEST,
});

export const fetchTeamSuccess=(teams)=>({
    type: GET_TEAMS_SUCCESS,
    payload: teams,
});

export const fetchTeamFailure =(error)=>({
    type: GET_TEAMS_FAILURE,
    payload:error
});

export const GetTeams=()=>{
    return async (dispatch) => {
        dispatch(fetchTeamRequest());
        try {
            const response = await getTeams();
            const data =response.data;
            dispatch(fetchTeamSuccess(data));
        } catch (error) {
            dispatch(fetchTeamFailure(error));
        }
    }
 };
