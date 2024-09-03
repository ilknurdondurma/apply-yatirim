import { getContacts, updateContact } from "../../../api";
import {GET_CONTACTS_REQUEST,GET_CONTACTS_SUCCESS,GET_CONTACTS_FAILURE, UPDATE_CONTACT_SUCCESS} from '../../actionsType/contact'

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
export const updateContactSuccess = (contact) => ({
  type: UPDATE_CONTACT_SUCCESS,
  payload: contact,
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

export const UpdateContact = (id,updatedContact) => {
  return async (dispatch) => {
    dispatch(fetchContactsRequest());
    try {
      const response = await updateContact(id, updatedContact);
      const data = response.data;
      dispatch(updateContactSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
      dispatch(fetchContactsFailure(errorMessage));
    }
  };
};

//OK
