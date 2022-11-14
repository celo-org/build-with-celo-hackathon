import differenceWith from 'lodash.differencewith';
import getFileRejections from './get-file-rejections';
/**
 * Returns a list of accepted files based on the provided options
 * @param {File[]} files
 * @param {import('./split-files').SplitFilesOptions | undefined} options
 * @returns {File[]}
 */

var getAcceptedFiles = function getAcceptedFiles(files, options) {
  if (options == null) {
    return files;
  }

  var fileRejections = getFileRejections(files, options);
  return differenceWith(files, fileRejections, function (file, fileRejection) {
    return file === fileRejection.file;
  });
};

export default getAcceptedFiles;