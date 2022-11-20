import React, { useEffect, useState } from "react";
import { getIPFSFileURL } from "../../services/web3storageIPFS";

const DocumentCard = ({ docName, docCid, fileName }) => {
  const viewDoc = () => {
    if (!docCid) return null;
    let url = getIPFSFileURL(docCid);
    if (fileName) url += `/${fileName}`;
    console.log(fileName);
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        backgroundColor: "#20232A",
        borderRadius: "8px",
        display: "flex",
        padding: "11px 16px",
      }}
      className="justify-between mb-2"
    >
      <div>
        <p>{docName ? null : "View Document"}</p>
        {docName ? (
          <p style={{ fontStyle: "italic", color: "#E6E6E6" }}> {docName}</p>
        ) : null}
      </div>
      <a className="text-blue-700" onClick={viewDoc}>
        View Document
      </a>
    </div>
  );
};

export default DocumentCard;
