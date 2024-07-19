export const darkTheme = { backgroundColor: 'black',color:'white' };
  export const lightTheme = { backgroundColor: 'white',color:'black' };
  
  const initialState = {
    theme:darkTheme
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DARK':
        return {
          ...state,
          theme: action.payload !== undefined ? action.payload : darkTheme,
          
        };
      case 'LIGHT':
        return {
          ...state,
          theme: action.payload !== undefined ? action.payload : lightTheme,
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  