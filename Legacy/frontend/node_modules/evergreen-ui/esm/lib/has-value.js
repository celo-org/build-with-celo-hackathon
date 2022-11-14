import isEmpty from 'lodash.isempty';
/**
 * Returns whether or not the value is non-nil and non-empty
 * @param {string | any[] | null | undefined} value Value to check
 * @returns {value is string | any[]}
 */

var hasValue = function hasValue(value) {
  return !isEmpty(value);
};

export default hasValue;