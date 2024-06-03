export const setItemInLocalStorage = (key:string, value:any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };
  
  export const getItemFromLocalStorage = (key:string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };
  