import {DARK, LIGHT} from '../../actionsType/theme'


export const dark = (val) => {
    return {
      type: DARK,
      payload:val
    };
  };
  
  export const light = (val) => {
    return {
      type: LIGHT,
      payload:val
    };
  };

  
  const themeActions ={dark,light}; // ilgili ekşınlar buraya tek çatı altında
  export default themeActions;