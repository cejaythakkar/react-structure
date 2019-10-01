import { createSetterActions, createAction } from '../../redux/action';
import { getEmployeeData } from '../../services/auth';

import { NAME } from './constants';

export const [setUserName, setPassword, setLoading, setErrors] = createSetterActions(NAME, [
  'username',
  'password',
  'loading',
  'errors',
]);

export const reset = createAction(`${NAME}/RESET`);

const API_CALL = () => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, 2000);
  });
};

export const login = (username, password) => async dispatch => {
  try {
    console.log(username, password);
    dispatch(setLoading(true));
    await API_CALL();
  } catch (error) {
    console.log('error');
  } finally {
    dispatch(setLoading(false));
  }
};

export const getEmployees = () => async dispatch => {
  try {
    await getEmployeeData();
  } catch (error) {
    // set error
  } finally {
    dispatch(setLoading(false));
  }
};
