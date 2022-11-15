import React from "react";
import FileUploader from "./Components/FileUploader";

const TestFile = () => {
  return <FileUploader handleFile={(e) => console.log(e)} />;
};

export default TestFile;
