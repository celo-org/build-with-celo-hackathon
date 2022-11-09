/**
 * Returns whether or not the given parameter is a function
 * @param {Function | null | undefined} maybeFunction
 * @returns {maybeFunction is Function}
 */
var isFunction = function isFunction(maybeFunction) {
  return typeof maybeFunction === 'function';
};

export default isFunction;