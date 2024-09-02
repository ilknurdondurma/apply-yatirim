  export const darkTheme = { backgroundColor: '#212121',color:'#f8fafc' };
  export const lightTheme = { backgroundColor: '#f8fafc',color:'#212121' };
  export const grayDarkTheme = { backgroundColor: '#2f2f2f',color:'#f8fafc' };
  export const grayLightTheme = { backgroundColor: '#b9b9b9',color:'#212121' };
  
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
  