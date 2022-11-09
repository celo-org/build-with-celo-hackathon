/**
 * Returns whether or not the given MimeType is an image
 * @param {string} mimeType MimeType to test
 * @returns {boolean}
 */
var isImage = function isImage(mimeType) {
  var _mimeType$includes;

  return (_mimeType$includes = mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('image')) !== null && _mimeType$includes !== void 0 ? _mimeType$includes : false;
};

export default isImage;