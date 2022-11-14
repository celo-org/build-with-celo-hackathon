import humanize from 'humanize-plus';
import mimeTypesToExtensions from './mime-types-to-extensions';
/**
 * Returns a standard message informing the user what file extensions are accepted based
 * on the provided array of MimeTypes
 * @param {string[]} acceptedMimeTypes
 * @returns {string}
 */

export var getAcceptedTypesMessage = function getAcceptedTypesMessage(acceptedMimeTypes) {
  var fileExtensions = humanize.oxford(mimeTypesToExtensions(acceptedMimeTypes));
  return "You can upload ".concat(fileExtensions, " formats.");
};
/**
 * Returns a standard message informing the user of the maximum individual file size
 * @param {number} maxSizeInBytes
 * @returns {string}
 */

export var getFileSizeMessage = function getFileSizeMessage(maxSizeInBytes) {
  return "You can upload files up to ".concat(humanize.fileSize(maxSizeInBytes, 0), ".");
};
/**
 * Returns a standard message informing the user of the maximum number of files that can be uploaded
 * @param {number} maxFiles
 * @returns {string}
 */

export var getMaxFilesMessage = function getMaxFilesMessage(maxFiles) {
  return "You can upload up to ".concat(maxFiles, " ").concat(maxFiles === 1 ? 'file' : 'files', ".");
};