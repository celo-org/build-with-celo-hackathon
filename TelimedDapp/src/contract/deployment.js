require('dotenv').config({path: '../../.env'})
const algosdk = require('algosdk');
const { getApplicationAddress } = require('algosdk');
const fs = require("fs");

async function compileProgram(algodClient, programSource) {
  const file = fs.readFileSync((programSource), "utf8");
  const compile = await algodClient.compile(file).do();
  const compiledBytes = new Uint8Array(Buffer.from(compile.result, "base64"))
  return compiledBytes
}

async function deployApp(){
    try {
        const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
        const base_server = process.env.REACT_APP_ALGOD_SERVER
        const port = process.env.REACT_APP_PORT
        const algodClient = new algosdk.Algodv2(token, base_server, port);
        const params = await algodClient.getTransactionParams().do();

        const mnemonic = process.env.REACT_APP_DEPLOYER_MNEMONIC
        const deployer_sk = algosdk.mnemonicToSecretKey(mnemonic);
        const deployer_addr = deployer_sk.addr;

        const approvalProgram = await compileProgram(algodClient, "./approval.teal")
        const clearProgram = await compileProgram(algodClient, "./clear.teal")

        const onComplete = algosdk.OnApplicationComplete.NoOpOC;

        const localInts = 0;
        const localBytes = 0;
        const globalInts = 10;
        const globalBytes = 10;
        const DOCTOR = "PI634P3PGBOFCDSINZ7OOJBHTCBWJUVDAWWNVBKEICZRXUHD5A7O7MAX4M"
        const PHARMACIST = "4YX2KADOTQ337AJ4AQZOHNF4H5INMVVDXFXSW7JZMODBXHRRMLMW6KI5SU"
        const INSURER = "44DY7ZJ5XBSTMZ4K2AYRKS7Q2ECBPQZ24NWUC2OE4XIWPAQGOQYFCKZYMI"
        const accounts = [DOCTOR, PHARMACIST, INSURER];
        const foreignApps = undefined;
        const foreignAssets = undefined; 

        const appArgs = undefined;
    
        const createApp = algosdk.makeApplicationCreateTxn(
          deployer_addr,
          params,
          onComplete,
          approvalProgram,
          clearProgram,
          localInts,
          localBytes,
          globalInts,
          globalBytes,
          appArgs,
          accounts,
          foreignApps,
          foreignAssets);

        const signedTxn = createApp.signTxn(deployer_sk.sk);
       
        // Submit the transaction
        const tx = (await algodClient.sendRawTransaction(signedTxn).do());

        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        const transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
        const appId = transactionResponse['application-index'];

        // Get App Address 
        let contract_addr =  getApplicationAddress(appId)
        console.log(contract_addr)
        
        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        console.log("The application ID is: " + appId)

    }
    catch (err) {
        console.log("err",err);
    }
    process.exit()
};

deployApp();