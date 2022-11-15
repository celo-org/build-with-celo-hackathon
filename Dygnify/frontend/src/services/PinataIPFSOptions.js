import { useEffect, useState } from "react";

const axios = require("axios");

export const testAuthentication = () => {
  var api_options = {
    method: "get",
    url: "https://api.pinata.cloud/data/testAuthentication",
    headers: {
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
    },
  };

  return api_options;
};

export const uploadFileToIPFS = (stream) => {
  const data = new FormData();
  data.append("file", stream);

  var api_options = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
    },
    data: data,
  };

  return api_options;
};

export const pinJSONToIPFS = (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinataCall = async (metadata) => {
  const pinataResponse = await pinJSONToIPFS(metadata);
  console.log(pinataResponse);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  return pinataResponse.pinataUrl;
};

export const ExtractIPFSdataFromHash = (hash) => {
  const [check, setCheck] = useState({});
  let str = "https://gateway.pinata.cloud/ipfs/" + hash;
  // str = str?.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  useEffect(() => {
    async function dataFetch() {
      try {
        const response = await axios.get(str);
        setCheck(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    dataFetch();
  }, [str]);

  return check;
};
