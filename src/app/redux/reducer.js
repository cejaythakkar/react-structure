import { assocPath } from '../../lib/ramda';

export const createSetter = (...propPath) => (state, { value }) =>
  assocPath(propPath, value, state);

export const createDistinctSetter = (...propPath) => (state, { '@@id': id, value }) =>
  assocPath([id, ...propPath], value, state);

export const createReducer = (defaultState, handler) => (
  state = defaultState,
  { type, ...rest }
) => {
  if (handler[type]) return handler[type](state, { ...rest });

  return state;
};
