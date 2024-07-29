import { getContacts } from "../../../api";
import {GET_CONTACTS_REQUEST,GET_CONTACTS_SUCCESS,GET_CONTACTS_FAILURE} from '../../actionsType/contact'

export const fetchContactsRequest = () => ({
  type: GET_CONTACTS_REQUEST,
});

export const fetchContactsSuccess = (contacts) => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
});

export const fetchContactsFailure = (error) => ({
  type: GET_CONTACTS_FAILURE,
  payload: error,
});


// API isteği

export const GetContacts = () => {
  return async (dispatch) => {
    dispatch(fetchContactsRequest());
    try {
      const response = await getContacts();
      const data = response.data; // hata varsa apiden response.data.data olarak döndüğündendir!
      dispatch(fetchContactsSuccess(data));
    } catch (error) {
      dispatch(fetchContactsFailure(error.message));
    }
  };
};


