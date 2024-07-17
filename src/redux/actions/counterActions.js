export const increment = (val) => {
    return {
      type: 'INCREMENT',
      payload:val
    };
  };
  
  export const decrement = (val) => {
    return {
      type: 'DECREMENT',
      payload:val
    };
  };
  export const carp = (val) => {
    return {
      type: 'CARP',
      payload:val
    };
  };
  
  const counterActions ={increment,decrement,carp}; // ilgili ekşınlar buraya tek çatı altında
  export default counterActions;