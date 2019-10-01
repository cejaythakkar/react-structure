import { createReducer, createSetter } from '../../redux/reducer';

import * as actions from './actions';

const initialState = {
  loading: false,
  data: [],
};

export default createReducer(initialState, {
  [actions.setData]: createSetter('data'),
  [actions.setLoading]: createSetter('loading'),
  [actions.reset]: initialState,
});
