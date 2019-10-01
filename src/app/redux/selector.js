import { isArray } from 'lodash';

import { path, pathOr } from '../../lib/ramda';

/**
 * @param {string} name The reducer name
 * @param {(string | string[])[]} propNames The reducer prop to select
 * @returns {Function[]} The selector functions
 */
export const createSelectors = (name, propNames) =>
  propNames.map(propName => state =>
    isArray(propName) ? path(propName, state[name]) : state[name][propName]
  );

export const createDistinctSelectors = (name, propNames) =>
  propNames.map(propName => id => state =>
    isArray(propName)
      ? pathOr(path(propName, state[name].defaults), [id, ...propName], state[name])
      : pathOr(state[name].defaults[propName], [id, propName], state[name])
  );
