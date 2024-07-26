import { deleteService, getServices, updateService, addService } from '../../../api';
import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  ADD_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS
} from '../../actionsType/service';

export const fetchServicesRequest = () => ({
  type: GET_SERVICES_REQUEST,
});

export const fetchServicesSuccess = (services) => ({
  type: GET_SERVICES_SUCCESS,
  payload: services
});

export const fetchServicesFailure = (error) => ({
  type: GET_SERVICES_FAILURE,
  payload: error
});

export const fetchServices = () => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await getServices();
      const data = response.data;
      console.log("actions: ",data)
      dispatch(fetchServicesSuccess(data));
    } catch (error) {
      dispatch(fetchServicesFailure(error.response?.status === 500 ? 'Server Error' : error.message));
    }
  };
};

export const addServicee = (added) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await addService(added);
      const data = response.data;
      dispatch({ type: ADD_SERVICE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(fetchServicesFailure(error.response?.status === 500 ? 'Server Error' : error.message));
    }
  };
};

export const updateServicee = (id, updated) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await updateService(id, updated);
      const data = response.data;
      dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(fetchServicesFailure(error.response?.status === 500 ? 'Server Error' : error.message));
    }
  };
};

export const deleteServicee = (id) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      await deleteService(id);
      dispatch({ type: DELETE_SERVICE_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch(fetchServicesFailure(error.response?.status === 500 ? 'Server Error' : error.message));
    }
  };
};
