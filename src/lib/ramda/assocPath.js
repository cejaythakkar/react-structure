/* eslint-disable */
import { has as _has, isInteger as _isInteger, isArray as _isArray } from 'lodash';

import _curry3 from './internal/_curry3';
import assoc from './assoc';
import isNil from './isNil';

const assocPath = _curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  const idx = path[0];

  if (path.length > 1) {
    const nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});

export default assocPath;
