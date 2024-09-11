import { addCatalog, deleteCatalog, getAllCatalogs, updateCatalog } from "../../../api";
import { GET_CATALOGS_REQUEST, GET_CATALOGS_SUCCESS,GET_CATALOGS_FAILURE, ADD_CATALOG_SUCCESS, UPDATE_CATALOG_SUCCESS, DELETE_CATALOG_SUCCESS, DOWNLOAD_CATALOG_SUCCESS } from "../../actionsType/catalog";

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
export const addCatalogSuccess=(catalog)=>({
  type: ADD_CATALOG_SUCCESS,
  payload: catalog,
});

export const updateCatalogSuccess=(catalog)=>({
  type: UPDATE_CATALOG_SUCCESS,
  payload: catalog,
});

export const deleteCatalogSuccess=(catalog)=>({
  type: DELETE_CATALOG_SUCCESS,
  payload: catalog,
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

export const AddCatalog=(newCatalog)=>{
  return async (dispatch)=>{
    dispatch(fetchCatalogsRequest());
    try {
      const response = await addCatalog(newCatalog);
      const data = response.data;
      dispatch(addCatalogSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500? 'Server Error' : error.message;
      dispatch(fetchCatalogsFailure(errorMessage));
    }
  }
};
export const UpdateCatalog = (id,updatedCatalog) => {
  return async (dispatch) => {
    dispatch(fetchCatalogsRequest());
    try {
      const response = await updateCatalog(id ,updatedCatalog);
      const data = response.data;
      dispatch(updateCatalogSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchCatalogsFailure(errorMessage));
    }
  };
};

export const DeleteCatalog = (id) => {
  return async (dispatch) => {
    dispatch(fetchCatalogsRequest());
    try {
      await deleteCatalog(id);
      dispatch(deleteCatalogSuccess(id));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchCatalogsFailure(errorMessage));
    }
  };
};
