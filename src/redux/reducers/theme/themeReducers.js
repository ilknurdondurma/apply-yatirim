export const darkTheme = { backgroundColor: '#0d0e11',color:'#f8fafc' };
  export const lightTheme = { backgroundColor: '#f8fafc',color:'#0d0e11' };
  
  const initialState = {
    theme:lightTheme
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
  