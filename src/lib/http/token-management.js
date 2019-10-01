/* ************************************
 * token related functions
 ************************************* */

import { isEmpty } from 'lodash';

import { removeItem, setItem, getItem } from '../../app/helpers';

const KEYS = {
  ID_TOKEN: 'id_token',
};

export const logout = () => {
  // Clear user token and profile data from localStorage
  removeItem(KEYS.ID_TOKEN);
};

export const getToken = () => {
  // Retrieves the user token from localStorage
  return getItem(KEYS.ID_TOKEN);
};

export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !isEmpty(token);
};

export const setToken = idToken => {
  // Saves user token and rememberMe to cookie
  setItem(KEYS.ID_TOKEN, idToken);
};
