require("dotenv").config();
const Web3 = require("../helpers/web3Helper");
const ABI = require("../../../abis/CryptoVentures.json");

const web3Instance = new Web3(
  process.env.GANACHE,
  ABI.abi,
  "0x9B75157023A18f818345e885dBEe1e21563342fF"
);
let fundName = "Kamu";
getBal = async (fundName) => {
  let bal = await web3Instance.getTotalContributions(fundName);
  console.log("Bal:", bal);
};

//==============================================================
// web3Instance.on("fundCreated", ({ name, size, owner }) => {
//   console.log("Fund created: ", name);
//   console.log("Fund size: ", size);
//   console.log("Fund owner: ", owner);
// });

// const wallet = web3Instance.createWallet();
// console.log("wallet: ", wallet);
// web3Instance
//   .createFund(fundName, 2, "0xD1544F03fa75737052D78Ff9fE46F47403c6c37C")
//   .then(() => console.log("Done"));

//==============================================================
web3Instance.on("investedInFund", ({ nameOfFund, amount, investorAddress }) => {
  console.log("Name of Fund: ", nameOfFund);
  console.log("amount Invested: ", amount);
  console.log("Address of Investor: ", investorAddress);
});
web3Instance.investInFund(
  "0xD1544F03fa75737052D78Ff9fE46F47403c6c37C",
  "0x4A5373364D9eF7B773Eb76df70FeA525caAc5B50",
  fundName,
  3
);

getBal(fundName);

//====================================================================
//tatum :TODO:
// web3Instance.on("investedInStartup", ({ startupAddress, nameOfFund, size }) => {
//   console.log("Name of Fund: ", nameOfFund);
//   console.log("amount Invested: ", size);
//   console.log("Address of startup: ", startupAddress);
// });

// web3Instance.investInStartup(
//   "0xD1544F03fa75737052D78Ff9fE46F47403c6c37C",
//   "0x69715d76fD1deb26750e19a701FBd6f2F6505DF0",
//   fundName,
//   2
// );

getBal(fundName);
