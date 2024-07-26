import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  ADD_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS
} from '../../actionsType/service';

const initialValues = {
  services: [],
  loading: false,
  error: null,
};

const serviceReducer = (state = initialValues, action) => {
  switch (action.type) {
    case GET_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        loading: false,
        error: null,
      };
    case GET_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id ? action.payload : service
        ),
        loading: false,
        error: null,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload.id),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default serviceReducer;