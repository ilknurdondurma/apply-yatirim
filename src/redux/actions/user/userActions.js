import { getUsers } from "../../../api";
import {GET_USERS_REQUEST, GET_USERS_SUCCESS ,GET_USERS_FAILURE, ADD_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS} from "../../actionsType/user"
export const fetchUsersRequest=()=>({
    type: GET_USERS_REQUEST,
});

export const fetchUsersSuccess =(users)=>({
    type: GET_USERS_SUCCESS,
    payload: users,

});

export const fetchUsersFailure =(error)=>({
    type: GET_USERS_FAILURE,
    payload: error,
});


// export const addUserSuccess =(user)=>({
//     type: ADD_USER_SUCCESS,
//     payload: user
// });

// export const updateUserSuccess =(user)=>({
//     type: UPDATE_USER_SUCCESS,
//     payload: user
// });

// export const deleteUserSuccess =(id)=>({
//     type: DELETE_USER_SUCCESS,
//     payload: id
// });
//---------------------------

export const GetUsers=()=>{
    return async (dispatch)=>{
        dispatch(fetchUsersRequest());
        try{
            const response=await getUsers();
            const data=response.data;
            dispatch(fetchUsersSuccess(data));
        }catch(error){
            dispatch(fetchUsersFailure(error));
        }
    }
}