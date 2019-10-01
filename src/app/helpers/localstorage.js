/* *************************************
 * operations related to localstorage
 ************************************** */

// set item to localstorage to specific key
export const setItem = (key, data) => {
  return localStorage.setItem(key, data);
};

// get item from localstorage with specific key
export const getItem = key => {
  return localStorage.getItem(key);
};

// remove item from localstorage with specific key
export const removeItem = key => {
  return localStorage.removeItem(key);
};

// remove all local storage data
export const clearStorage = () => {
  localStorage.clear();
};
