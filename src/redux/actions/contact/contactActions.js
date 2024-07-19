import { getContacts } from "../../../api";
import {FETCH_CONTACTS_REQUEST,FETCH_CONTACTS_SUCCESS,FETCH_CONTACTS_FAILURE} from '../../actionsType/contact'

export const fetchContactsRequest = () => ({
  type: FETCH_CONTACTS_REQUEST,
});

export const fetchContactsSuccess = (contacts) => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

export const fetchContactsFailure = (error) => ({
  type: FETCH_CONTACTS_FAILURE,
  payload: error,
});


// API isteği

export const fetchContacts = () => {
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


