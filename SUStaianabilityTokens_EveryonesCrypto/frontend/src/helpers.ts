import Web3 from "web3";
import { Transaction } from "@ethereumjs/tx";
import { Chain, Common } from "@ethereumjs/common";

export const makeTransaction = async () => {
  const providerURL =
    "https://polygon-mumbai.infura.io/v3/59b06c37b15d41b4bb3c956d782d3e91";
  const web3 = new Web3(providerURL);
  //
  // accounts
  const account1 = {
    address: "0x8631f7BE5380D8739dE48d319e5c13A05f24ACa2",
    privateKey: Buffer.from(
      "699477ec8ec3db7d9536177aa67e5003dbd6833badcc24652bae9f4fc246698b",
      "hex"
    ),
  };
  const account2 = {
    address: "0x55896907CaB73CA9Ecf94d27Aa9a6302c697a5C0",
    privateKey: Buffer.from(
      "e8146b721183b3b9f114b1e316b076ec307bfc402ab0b3396ea09131c30cd99d",
      "hex"
    ),
  };

  // get & show balance
  let balance = await web3.eth.getBalance(account1.address);
  console.log("account balance (wei): ", balance);
  console.log(
    "account balance (ether): ",
    web3.utils.fromWei(balance, "ether")
  );

  // get & show nonce
  const nonce = await web3.eth.getTransactionCount(account1.address);
  console.log("account nonce: ", nonce);

  // amount to send
  const amountToSend = web3.utils.toWei("0.01", "ether");

  // build transaction object
  const transactionData = {
    nonce: web3.utils.toHex(nonce),
    to: account2.address,
    value: web3.utils.toHex(amountToSend),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };
  console.log(transactionData);

  // Ether
  // sign transaction
  const common = new Common({ chain: Chain.Goerli });
  const transaction = Transaction.fromTxData(transactionData, { common });
  console.log(transaction);

  const signedTransaction = transaction.sign(account1.privateKey);

  // calculate gas fee cost
  const feeCost = signedTransaction.getUpfrontCost();
  console.log("Total Amount of wei needed: " + feeCost.toString());

  // serialize transaction
  const serializedTransaction = signedTransaction.serialize();
  const rawTransaction = "0x" + serializedTransaction.toString("hex");
  // const rawTransaction = "0x" + serializedTransaction.toString("hex");
  console.log(rawTransaction);

  // broadcast transaction
  const hash = await web3.eth.sendSignedTransaction(rawTransaction);
  console.log("success!! hash: ", hash);
};
