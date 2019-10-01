import { createReducer } from '../../redux/reducer';

import * as actions from './actions';

export default createReducer(
  {
    requestCount: 0,
  },
  {
    [actions.incrementRequestCount]: state => ({
      ...state,
      requestCount: state.requestCount + 1,
    }),
    [actions.decrementRequestCount]: state => ({
      ...state,
      requestCount: state.requestCount > 0 ? state.requestCount - 1 : 0,
    }),
  }
);
