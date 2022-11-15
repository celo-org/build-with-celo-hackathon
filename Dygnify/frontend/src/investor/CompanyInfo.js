import { React, useState } from "react";
import { ethers } from "ethers";
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NFTMinter from "../artifacts/contracts/protocol/old/NFT_minter.sol/NFTMinter.json";
import axiosHttpService from "../services/axioscall";
import { uploadFileToIPFS } from "../services/PinataIPFSOptions";
import { getOpportunitysOf } from "../components/transaction/TransactionHelper";
const axios = require("axios");

const REACT_APP_PINATA_API_KEY = "bd910e460ee4b6ef0519";
const REACT_APP_PINATA_API_SECRET =
  "38f736a6d364857d02414d490277de4952207f74d1f495c4f2158332639120b7";
const tokenAddress = "0x1546A8e7389B47d2Cf1bacE7C0ad3e0A91CAae94";
const NFT_minter = "0xbEfC9040e1cA8B224318e4f9BcE9E3e928471D37";

//metadata to ipfs
const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: REACT_APP_PINATA_API_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
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
const CompanyInfo = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState();
  const dataFetch = async () => {
    setData(await getOpportunitysOf());
  };
  dataFetch();
  dataFetch();
  console.log(data);

  const [selectedFile, setSelectedFile] = useState();
  const [tokenURI, setTokenURI] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function mint_NFT(tokenURI, imageURI) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFT_minter, NFTMinter.abi, signer);
      const transaction = await contract.mint(tokenURI);
      await transaction.wait();
      console.log(`${tokenURI} has minted sucessfully.`);
    }
  }

  // On file upload (click the upload button)
  async function onFileUpload() {
    try {
      console.log("Upload called");
      let ipfsUploadRes = await axiosHttpService(
        uploadFileToIPFS(selectedFile)
      );
      console.log(ipfsUploadRes);
      //make metadata
      const metadata = new Object();
      metadata.imageHash = ipfsUploadRes.res.IpfsHash;
      metadata.PinSize = ipfsUploadRes.res.PinSize;
      metadata.Timestamp = ipfsUploadRes.res.Timestamp;

      //make pinata call
      const pinataResponse = await pinJSONToIPFS(metadata);
      if (!pinataResponse.success) {
        return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
        };
      }
      const tokenURI = pinataResponse.pinataUrl;
      console.log(tokenURI);
      mint_NFT(
        tokenURI,
        "https://gateway.pinata.cloud/ipfs/" + metadata.imageHash
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <style>{"body { background-color: #7165e3 }"}</style>
      <Box
        sx={{
          height: "90px",
          backgroundColor: "#ffffff",
          borderEndEndRadius: "12px",
          borderEndStartRadius: "12px",
          px: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <img
            style={{ width: "150px", height: "80px", objectFit: "contain" }}
            src="./assets/logo.png"
            alt="company logo"
          />
        </Box>
        <Typography>Income Generating Loans</Typography>
        <Typography color="#7165E3">Overview</Typography>
        <Typography>Investments</Typography>
        <Typography>Assets</Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="body2">Switch to</Typography>
            <Button
              size="small"
              sx={{ backgroundColor: "#E5E5E5", borderRadius: "120px" }}
            >
              {process.env.REACT_APP_TOKEN_NAME}
            </Button>
          </div>
          <Button
            sx={{ backgroundColor: "#7165E3" }}
            variant="contained"
            size="large"
          >
            Connect Wallet
          </Button>
        </div>
      </Box>
      <Stack
        sx={{
          my: "20px",
          mx: "auto",
          maxWidth: 1150,
          height: 80,
          py: "10px",
          px: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            color: "#ffffff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Card
              sx={{
                mb: "5px",
                maxWidth: 100,
                py: "2px",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                textAlign: "justify",
              }}
            >
              <img
                style={{ width: "88px", height: "77px" }}
                src="./assets/supply-chain.png"
                alt=""
              />
            </Card>
          </Box>
          <Typography ml={2}>Supply Chain Finance</Typography>
        </Stack>
        <Button
          sx={{ backgroundColor: "#ffffff", color: "#000000" }}
          variant="contained"
        >
          <Link to="/kyc">Invest</Link>
        </Button>
      </Stack>
      <Box>
        <Card
          sx={{
            my: "20px",
            maxWidth: 1100,
            height: 130,
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="subtitle2">
              Short term credit by financing receivables
            </Typography>
            <Typography variant="overline">Asset Type</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div>
            <Typography variant="subtitle2">24 months</Typography>
            <Typography variant="overline">Asset Maturity</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">10.45 %</Typography>
            <Typography variant="overline">Yield</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography variant="subtitle2">
              59,87,197 {process.env.REACT_APP_TOKEN_NAME}
            </Typography>
            <Typography variant="overline">Value</Typography>
          </div>
        </Card>
      </Box>
      <Stack
        sx={{
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Impact Partner Details</Typography>
      </Stack>
      <Box>
        <Card
          sx={{
            mb: "20px",
            maxWidth: 1100,
            py: "20px",
            px: "30px",
            mx: "30px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          <Typography variant="h6">ABC Finance Private Limited</Typography>
          <Typography variant="body2">
            ABC is a company operating in Southern India that provides invoice
            factoring services, which involves buying a business's unpaid
            invoices at a discount. ABC was founded in 20XX and has operations
            in southern states of Karnataka, Tamil Nadu, Andhra Pradesh,
            Telangana, and has since originated over $30 Mn in loans to over 10
            millions borrowers. This opportunity will consist of tranches of a
            secured non convertible debenture with a maturity of 24 months
            backed by a portfolio of loans made to customers.
          </Typography>
        </Card>
      </Box>
      <Stack
        sx={{
          mt: "10px",
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Opportunity Status</Typography>
      </Stack>
      <Box
        sx={{
          mb: "30px",
          maxWidth: 1100,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0px 16px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: "16px",
            px: "30px",
          }}
        >
          <Typography variant="h6">Assets</Typography>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Number of Assets</Typography>
            <Typography>32</Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Average Financing fee</Typography>
            <Typography>13.10%</Typography>
          </Stack>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Average Maturity</Typography>
            <Typography>24 months</Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            py: "16px",
            px: "30px",
          }}
        >
          <Typography variant="h6">Liquidity </Typography>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography>Available Liquidity</Typography>
            <Typography>5,60,000 {process.env.REACT_APP_TOKEN_NAME}</Typography>
          </Stack>
        </Card>
      </Box>
      <Stack
        sx={{
          maxWidth: 1100,
          py: "10px",
          px: "30px",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Collateral</Typography>
      </Stack>
      <Box>
        <Card
          sx={{
            mb: "20px",
            maxWidth: 1100,
            py: "20px",
            px: "30px",
            mx: "30px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          {tokenURI === "" ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography mb={1} variant="subtitle2">
                Upload collateral document for converting to a unique NFT
              </Typography>
              <input
                type="file"
                style={{ maxWidth: "500px" }}
                onChange={(event) => setSelectedFile(event.target.files[0])}
                class="custom-file-upload"
              />
              <Button
                sx={{
                  backgroundColor: "#7165E3",
                  width: "300px",
                  marginTop: "10px",
                }}
                variant="contained"
                size="large"
                onClick={onFileUpload}
              >
                Mint
              </Button>{" "}
            </div>
          ) : (
            <div>
              <h4>View your minted NFT here : </h4>
              <a href={tokenURI}>{tokenURI}</a>
            </div>
          )}
        </Card>
      </Box>
    </>
  );
};

export default CompanyInfo;
