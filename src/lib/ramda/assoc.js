/* eslint-disable */
import _curry3 from './internal/_curry3';

const assoc = _curry3(function assoc(prop, val, obj) {
  const result = {};

  // eslint-disable-next-line no-unused-vars
  for (const p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
});

export default assoc;
