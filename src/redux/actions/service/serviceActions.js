import { deleteService, getServices, updateService, addService } from '../../../api';
import { GET_SERVICES_SUCCESS,GET_SERVICES_REQUEST,GET_SERVICES_FAILURE ,ADD_SERVICE_SUCCESS,UPDATE_SERVICE_SUCCESS,DELETE_SERVICE_SUCCESS } from '../../actionsType/service';

export const fetchServicesRequest = () => ({
  type: GET_SERVICES_REQUEST,
});

export const fetchServicesSuccess = (services) => ({
  type: GET_SERVICES_SUCCESS,
  payload: services,
});

export const fetchServicesFailure = (error) => ({
  type: GET_SERVICES_FAILURE,
  payload: error,
});

export const addServiceSuccess = (service) => ({
  type: ADD_SERVICE_SUCCESS,
  payload: service,
});

export const updateServiceSuccess = (service) => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload: service,
});

export const deleteServiceSuccess = (id) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: { id },
});

//-------------------------------------------


export const GetServices = () => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await getServices();
      const data = response.data;
      dispatch(fetchServicesSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchServicesFailure(errorMessage));
    }
  };
};


export const AddService = (newService) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await addService(newService);
      const data = response.data;
      dispatch(addServiceSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchServicesFailure(errorMessage));
    }
  };
};


export const UpdateService = (id, updatedService) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await updateService(id, updatedService);
      const data = response.data;
      dispatch(updateServiceSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchServicesFailure(errorMessage));
    }
  };
};

export const DeleteService = (id) => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      await deleteService(id);
      dispatch(deleteServiceSuccess(id));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchServicesFailure(errorMessage));
    }
  };
};