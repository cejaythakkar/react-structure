/* eslint-disable */
import _isPlaceholder from './_isPlaceholder';

export default function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    }

    return fn.apply(this, arguments);
  };
}
