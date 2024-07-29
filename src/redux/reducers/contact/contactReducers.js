const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTACTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_CONTACTS_SUCCESS":
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case "GET_CONTACTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducers;
