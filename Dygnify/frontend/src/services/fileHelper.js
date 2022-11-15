function getBinaryFileData(fileObj) {
  try {
    if (fileObj) {
      let read = new FileReader();
      read.readAsBinaryString(fileObj);
      return read;
    }
  } catch (error) {
    console.log(error);
  }
}

function getDataURLFromFile(fileObj) {
  try {
    if (fileObj) {
      let read = new FileReader();
      read.readAsDataURL(fileObj);
      return read;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBinaryFileData,
  getDataURLFromFile,
};
