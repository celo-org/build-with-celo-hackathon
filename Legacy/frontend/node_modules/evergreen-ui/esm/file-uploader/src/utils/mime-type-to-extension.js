import { MimeType } from '../../../constants';
/**
 * Returns the corresponding file extension from the provided MimeType.
 * @param {string} mimeType
 * @returns {string | undefined} Mapped file extension from the MimeType, or `undefined` if not found
 */

var mimeTypeToExtension = function mimeTypeToExtension(mimeType) {
  var keys = Object.keys(MimeType);
  var key = keys.find(function (key) {
    return MimeType[key] === mimeType;
  });

  if (key == null) {
    return undefined;
  }

  return ".".concat(key);
};

export default mimeTypeToExtension;