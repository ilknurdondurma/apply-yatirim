import { addTeam, deleteTeam, getTeams, updateTeam } from "../../../api";
import { ADD_TEAM_SUCCESS, DELETE_TEAM_SUCCESS, GET_TEAMS_FAILURE, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS, UPDATE_TEAM_SUCCESS } from "../../actionsType/team";

export const fetchTeamsRequest=()=>({
    type: GET_TEAMS_REQUEST,
});

export const fetchTeamsSuccess=(teams)=>({
    type: GET_TEAMS_SUCCESS,
    payload: teams,
});

export const fetchTeamsFailure =(error)=>({
    type: GET_TEAMS_FAILURE,
    payload:error
});

export const updateTeamSuccess=(team)=>({
    type: UPDATE_TEAM_SUCCESS,
    payload: team,
})

export const deleteTeamSuccess=(team)=>({
    type: DELETE_TEAM_SUCCESS,
    payload: team,
})

export const addTeamSuccess=(team)=>({
    type: ADD_TEAM_SUCCESS,
    payload: team,
})
export const GetTeams=()=>{
    return async (dispatch) => {
        dispatch(fetchTeamsRequest());
        try {
            const response = await getTeams();
            const data =response.data;
            dispatch(fetchTeamsSuccess(data));
        } catch (error) {
            dispatch(fetchTeamsFailure(error));
        }
    }
 };

export const AddTeam = (newTeam) => {
  return async (dispatch) => {
    dispatch(fetchTeamsRequest());
    try {
      const response = await addTeam(newTeam);
      const data = response.data;
      dispatch(addTeamSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchTeamsFailure(errorMessage));
    }
  };
};


export const UpdateTeam = (id, updatedTeam) => {
  return async (dispatch) => {
    dispatch(fetchTeamsRequest());
    try {
      const response = await updateTeam(id, updatedTeam);
      const data = response.data;
      dispatch(updateTeamSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchTeamsFailure(errorMessage));
    }
  };
};

export const DeleteTeam = (id) => {
  return async (dispatch) => {
    dispatch(fetchTeamsRequest());
    try {
      await deleteTeam(id);
      dispatch(deleteTeamSuccess(id));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchTeamsFailure(errorMessage));
    }
  };
};