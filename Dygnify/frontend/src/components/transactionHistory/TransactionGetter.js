import { ethers } from "ethers";

const dygnifyStakingAddress = "0xCF1709F792c209Bf8fF1294aD9deaF0dfE44e9F6";
const token = "0x9C80225f50E1be2fa8b1f612616d03Bc9a491107";

const getEthAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return await signer.getAddress();
};

export async function getTransactionHistory() {
  //let userAddress = await getEthAddress();
  let userAddress = "0x23Db9F9731BCFb35CAc11B2e8373ACD14318bDF5";
  const url = new URL(
    `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${dygnifyStakingAddress}&address=${userAddress}&startblock=0&endblock=99999999&offset=5&sort=desc&apikey=${process.env.REACT_APP_POLYGONSCAN_APIKEY}`
  );
  console.log(url);
  const response = await fetch(url);
  const res = await response.json();
  const data = res.result;
  console.log(data);
  let utcSeconds = 1655390146;
  let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(utcSeconds);
  console.log(ethers.utils.formatEther(data[0].value));
  let tx = [];
  for (let i = 0; i < 5; i++) {
    let obj = {};
    let utcSeconds = data[i].timeStamp;
    let dateTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
    dateTime.setUTCSeconds(utcSeconds);
    let date = dateTime.toString();
    date = date.replace(" GMT+0530 (India Standard Time)", "");
    date = date.substring(4);
    let activity;
    if (data[i].from === "0x0000000000000000000000000000000000000000")
      activity = "Deposit";
    else activity = "Withdraw";
    obj.date = date;
    obj.txHash = data[i].hash;
    obj.subHash = data[i].hash.replace(data[i].hash.substring(5, 61), "......");
    obj.amount = ethers.utils.formatEther(data[i].value);
    obj.activity = activity;
    tx.push(obj);
  }
  console.log(tx);
  return tx;
}
