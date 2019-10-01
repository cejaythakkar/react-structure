import { createReducer, createSetter } from '../../redux/reducer';

import * as actions from './actions';

const initialState = {
  loading: false,
  username: '',
  password: '',
  errors: [],
};

export default createReducer(initialState, {
  [actions.setUserName]: createSetter('username'),
  [actions.setPassword]: createSetter('password'),
  [actions.setLoading]: createSetter('loading'),
  [actions.setErrors]: createSetter('errors'),
  [actions.reset]: initialState,
});
