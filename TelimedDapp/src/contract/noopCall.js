require('dotenv').config({path: '../.env'})
const { encodeUint64 } = require('algosdk');
const algosdk = require('algosdk');
const { APPID } = require("../../constants")
const EncodeBytes = require("../../utils")

async function appCall() {

    try {
      const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
      const base_server = process.env.REACT_APP_ALGOD_SERVER
      const port = process.env.REACT_APP_PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port);
        let params = await algodClient.getTransactionParams().do();
        params.fee = 2000
        params.flatFee = true;

        const mnemonic = process.env.REACT_APP_PATIENT_MNEMONIC
        let caller = algosdk.mnemonicToSecretKey(mnemonic);
        let caller_addr = caller.addr;
        
        let accounts = [process.env.REACT_APP_INSURANCE_ADDRESS];
        let foreignApps = undefined;
        let foreignAssets = undefined;
        const rekeyTo = algosdk.getApplicationAddress(APPID)
        let appID = APPID //update
        const closeRemainderTo = undefined;
        const revocationTarget = undefined;
        let appArgs = [];
        let amount = 2000000
        let message = "Here are the prescriptions"
        let note = new TextEncoder().encode(message);
        let lease = undefined
        appArgs.push(EncodeBytes("doctor"), encodeUint64(amount),);

        let paymentTransfer = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: caller_addr,
          to:  algosdk.getApplicationAddress(APPID),
          amount,
          note,
          suggestedParams: params,
        }  
      );

        let callContract = algosdk.makeApplicationNoOpTxn(
            caller_addr, 
            params, 
            appID, 
            appArgs, 
            accounts, 
            foreignApps, 
            foreignAssets,
            note,
            lease,
            // rekeyTo
            );
        // let signedTxn = callContract.signTxn(caller.sk);
       
        const atomictxn = [paymentTransfer, callContract];
        const txgroup = algosdk.assignGroupID(atomictxn);
        const signedTxn1 = paymentTransfer.signTxn(caller.sk);
        const signedTxn2 = callContract.signTxn(caller.sk);

        let signed = [];
        signed.push(signedTxn1);
        signed.push(signedTxn2);
        // Submit the transaction
        let tx = (await algodClient.sendRawTransaction(signed).do());

        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        let transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
        console.log("Called app-id:",transactionResponse['txn']['txn']['apid'])
         //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        if (transactionResponse['global-state-delta'] !== undefined ) {
            console.log("Global State updated:",transactionResponse['global-state-delta']);
        }
        if (transactionResponse['local-state-delta'] !== undefined ) {
            console.log("Local State updated:",transactionResponse['local-state-delta']);
        }
 
    }
    catch (err) {
        console.log("err", err);
    }
    process.exit();
};

appCall();