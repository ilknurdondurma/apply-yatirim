import { TOGGLE_SIDEBAR } from "../../actionsType/sidebar";

const initialState = {
  isSidebarOpen: true,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
