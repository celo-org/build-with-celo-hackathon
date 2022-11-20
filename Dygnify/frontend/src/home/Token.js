import { useState } from "react";
import { ethers } from "ethers";
import dygToken from "../artifacts/contracts/protocol/old/TestUSDCToken.sol/TestUSDCToken.json";
import NFTMinter from "../artifacts/contracts/protocol/old/NFT_minter.sol/NFTMinter.json";
import axiosHttpService from "../services/axioscall";
import { uploadFileToIPFS } from "../services/PinataIPFSOptions";
import { amlCheck } from "../services/OFACAxiosOptions";
import axios from "axios";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import opportunityOrigination from "../artifacts/contracts/protocol/OpportunityOrigination.sol/OpportunityOrigination.json";
import seniorPool from "../artifacts/contracts/protocol/SeniorPool.sol/SeniorPool.json";
import opportunityPool from "../artifacts/contracts/protocol/OpportunityPool.sol/OpportunityPool.json";
import "./Token.css"
const tokenAddress = "0x7d7FE8dbb260a213322b0dEE20cB1ca2d313EBfE";
const NFT_minter = "0xbEfC9040e1cA8B224318e4f9BcE9E3e928471D37";


//metadata to ipfs
const pinJSONToIPFS = async (JSONBody) => {
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

function Token() {
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [tokenURI, setTokenURI] = useState("");
  const [nameForAMLCheck, setNameForAMLCheck] = useState("");
  const [admin, setAdmin] = useState("");
  const [juniorPool, setJuniorPool] = useState("");
  const [usdcReceiver, setUsdcReceiver] = useState("");
  const [receiverContract, setReceiverContract] = useState("");
  const [opportunityId, setOpportunityId] = useState("");
  const [underWriter, setUnderWriter] = useState("");
  const [opportunityIdForInvest, setOpportunityIdForInvest] = useState("");
  
  async function grantAdminRole(contractId, receiver) {
    const admin = "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775";
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      let contract;
      if(contractId == 0){
        contract = new ethers.Contract(
          process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
          opportunityOrigination.abi,
          signer
        );
      }
      else if(contractId == 1){
        contract = new ethers.Contract(
          process.env.REACT_APP_SENIORPOOL,
          seniorPool.abi,
          signer
        );
      }

      const transaction1 = await contract.grantRole(admin,receiver);
      await transaction1.wait();
    }
  }

  async function grantAdminRoleOfPool(receiver) {
    const admin = "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775";
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const  contract = new ethers.Contract(
          juniorPool,
          opportunityPool.abi,
          signer
        );

      const transaction1 = await contract.grantRole(admin,receiver);
      await transaction1.wait();
    }
  }

  async function approveUSDCToken() {
    let amount = "10000000000000000000000000000";
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract2 = new ethers.Contract(
        process.env.REACT_APP_TEST_USDCTOKEN,
        dygToken.abi,
        signer
      );
      const transaction = await contract2.approve(
        usdcReceiver,
        amount
      );
      await transaction.wait();
    }
  }

  async function investInToJunior() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
          process.env.REACT_APP_SENIORPOOL,
          seniorPool.abi,
          signer
        );

      const transaction1 = await contract.invest(opportunityIdForInvest);
      await transaction1.wait();
    }
  }

  async function approveUSDCFromSenior() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
          process.env.REACT_APP_SENIORPOOL,
          seniorPool.abi,
          signer
        );

      const transaction1 = await contract.approveUSDC(receiverContract);
      await transaction1.wait();
    }
  }

  async function assignUnderWriter() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
          process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
          opportunityOrigination.abi,
          signer
        );

      const transaction1 = await contract.assignUnderwriters(opportunityId, underWriter);
      await transaction1.wait();
    }
  }

  async function lockPool(poolId) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const  contract = new ethers.Contract(
          juniorPool,
          opportunityPool.abi,
          signer
        );

      const transaction1 = await contract.lockPool(poolId);
      await transaction1.wait();
    }
  }

  async function unlockPool(poolId) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const  contract = new ethers.Contract(
          juniorPool,
          opportunityPool.abi,
          signer
        );

      const transaction1 = await contract.unLockPool(poolId);
      await transaction1.wait();
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        dygToken.abi,
        provider
      );
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, dygToken.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function approveSendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, dygToken.abi, signer);
      const transaction = await contract.approve(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function mint_NFT(tokenURI) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFT_minter, NFTMinter.abi, signer);
      const transaction = await contract.mint(tokenURI);
      await transaction.wait();
      console.log(`${tokenURI} has minted sucessfully.`);
      alert(`${tokenURI} has minted sucessfully.`);
    }
  }

  //web3.storage
  function makeStorageClient() {
    return new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_APIKEY });
  }

  async function storeFiles(files) {
    try {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      return cid;
    } catch (error) {
      console.log(error);
    }
  }

  // On file upload (click the upload button)
  async function onFileUpload() {
    try {
      console.log("Upload called");
      await storeFiles(selectedFile);
    } catch (error) {
      console.log(error);
    }
  }

  async function onCheckAML(name) {
    try {
      console.log("onCheckAML called");
      if (!name) {
        return;
      }
      let amlCheckRes = await axiosHttpService(amlCheck(name));
      console.log("Status " + amlCheckRes.code);
      console.log("Body" + amlCheckRes.res);
      console.log("Error " + amlCheckRes.res["error"]);
      if (amlCheckRes.code === 200 && amlCheckRes.res["error"] === false) {
        if (
          amlCheckRes.res["matches"][name][0] &&
          amlCheckRes.res["matches"][name][0]["score"] >=
            process.env.REACT_APP_OFAC_MIN_SCORE
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <header>
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={approveSendCoins}>Approve</button>
        <input
          type="file"
          multiple
          onChange={(event) => setSelectedFile(event.target.files)}
        />
        <button onClick={onFileUpload}>Upload</button>
        <h5 style={{ textAlign: "center" }}>
          {tokenURI === "" ? <h5>Upload your NFT before minting</h5> : tokenURI}
        </h5>
        <input
          type="text"
          onChange={(event) => setTokenURI(event.target.value)}
        />
        <button onClick={() => mint_NFT(tokenURI)}>Mint</button>
        <br />
        <input
          type="text"
          onChange={(event) => setNameForAMLCheck(event.target.value)}
        />
        <button onClick={() => onCheckAML(nameForAMLCheck)}>Check</button>
        <br />
        <br />
        <h3>Opportunity Origination contract</h3>
        <br />
        <input
          type="text"
          onChange={(event) => setAdmin(event.target.value)}
          placeholder="Target Address"
        />
        <button onClick={() => grantAdminRole(0,admin)}>Change Admin Role</button>

        <br />
        <input
          type="text"
          onChange={(event) => setOpportunityId(event.target.value)}
          placeholder="opportunity ID"
        />
        <br />
        <input
          type="text"
          onChange={(event) => setUnderWriter(event.target.value)}
          placeholder="UnderWriter Address"
        />
        <button onClick={() => assignUnderWriter()}>Assign underWriter</button>

        <br />
        <br />
        <h3>Senior Pool contract</h3>
        <br />
        <input
          type="text"
          onChange={(event) => setAdmin(event.target.value)}
          placeholder="Target Address"
        />
        <button onClick={() => grantAdminRole(1,admin)}>Change Admin Role</button>

        <br />
        <br />
        <input
          type="text"
          onChange={(event) => setReceiverContract(event.target.value)}
          placeholder="Receiver contract Address"
        />
        <button onClick={() => approveUSDCFromSenior()}>Approve</button>

        <br />
        <br />
        <input
          type="text"
          onChange={(event) => setOpportunityIdForInvest(event.target.value)}
          placeholder="Opportunity Id"
        />
        <button onClick={() => investInToJunior()}>Invest in Senior tranche</button>

        <br />
        <br />
        <h3>Junior Pool contract</h3>
        <br />
        <input
          type="text"
          onChange={(event) => setJuniorPool(event.target.value)}
          placeholder="Juniorpool Contract Address"
        />
        
        <br />
        <br />
        <input
          type="text"
          onChange={(event) => setAdmin(event.target.value)}
          placeholder="Target Address"
        />
        <br />
        <br />
        <button onClick={() => grantAdminRoleOfPool(admin)}>Change Admin Role</button>

        <br /><br />
        <input
          type="text"
          onChange={(event) => setJuniorPool(event.target.value)}
          placeholder="Juniorpool Contract Address"
        />

        <button onClick={() => lockPool(1)}>Lock senior tranche</button>
        
        <br /><br />
        <input
          type="text"
          onChange={(event) => setJuniorPool(event.target.value)}
          placeholder="Juniorpool Contract Address"
        />

        <button onClick={() => lockPool(0)}>Lock junior tranche</button>

        <br /><br />
        <input
          type="text"
          onChange={(event) => setJuniorPool(event.target.value)}
          placeholder="Juniorpool Contract Address"
        />

        <button onClick={() => unlockPool(1)}>Unlock senior tranche</button>
        
        <br /><br />
        <input
          type="text"
          onChange={(event) => setJuniorPool(event.target.value)}
          placeholder="Juniorpool Contract Address"
        />

        <button onClick={() => unlockPool(0)}>Unlock junior tranche</button>

        <br />
        <br />
        <h3>Test USDC</h3>
        <br />
        <input
          type="text"
          onChange={(event) => setUsdcReceiver(event.target.value)}
          placeholder="Receiver Address"
        />
        <button onClick={() => approveUSDCToken(usdcReceiver)}>Approve</button>
      </header>
    </div>
  );
}

export default Token;
