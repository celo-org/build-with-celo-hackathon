/**
 * Truncates a string in the center with ellipsis, if needed
 * @param {string} value Value to truncate
 * @param {number | undefined} maximumChars Maximum number of characters (including the ellipsis) to show
 * @returns {string}
 */
var truncateCenter = function truncateCenter(value) {
  var maximumChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 55;
  var length = value.length;

  if (length <= maximumChars) {
    return value;
  }

  var separator = '...';
  var charsToShow = maximumChars - separator.length;
  var startCharCount = Math.ceil(charsToShow / 2);
  var endCharCount = Math.floor(charsToShow / 2);
  return [value.substring(0, startCharCount), separator, value.substring(value.length - endCharCount)].join('');
};

export default truncateCenter;