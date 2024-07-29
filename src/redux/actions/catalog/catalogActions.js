import { getAllCatalogs } from "../../../api";
import { GET_CATALOGS_REQUEST, GET_CATALOGS_SUCCESS,GET_CATALOGS_FAILURE } from "../../actionsType/catalog";

export const fetchCatalogsRequest=()=>({
    type:GET_CATALOGS_REQUEST,
});

export const fetchCatalogsSuccess=(catalogs)=>({
    type: GET_CATALOGS_SUCCESS,
    payload: catalogs,
});

export const fetchCatalogsFailure=(error)=>({
    type: GET_CATALOGS_FAILURE,
    payload: error,
});


export const GetCatalogs = () => {
    return async (dispatch) => {
      dispatch(fetchCatalogsRequest());
      try {
        const response = await getAllCatalogs();
        const data = response.data;
        dispatch(fetchCatalogsSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchCatalogsFailure(errorMessage));
      }
    };
  };
