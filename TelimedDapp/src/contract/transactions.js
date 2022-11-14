const { default: algosdk } = require("algosdk")

const  PATIENT_MNEMONIC = "toddler taxi guilt length frame power enroll then brand intact comfort gate sick exclude tornado sword scrap cheese mystery magnet glove sausage alert about situate"
const  PATIENT_ADDRESS = "IQ7UESMB2RHOGCBXJP5S3KZUDLTSGSTKLPSS4DDFZHVXNYAZRBFYV4EWRM"

const  DOCTOR_MNEMONIC = "world upper west soul mom enter digital pill dutch sad coffee ill banner violin rocket judge allow slow cube fold umbrella bundle march absorb anxiety"
const  DOCTOR_ADDRESS = "E2BCG7PP4PV3NCC72SWIJ6ZSRM5OH3SLIR5BQFTJBPYZIK5WYE4US5OCJI"

const  PHARMACIST_MNEMONIC = "budget before tourist jelly net roast rural coin cycle spirit unknown rough menu churn lecture swap spider gentle firm window long caught frost about regret"
const  PHARMACIST_ADDRESS = "SR2ROPQ3JCQTSRC74RGTDZTOK42FKMYCIROZ7FT7GMYQILKH6CF5AALASE"

const  INSURANCE_MNEMONIC = "east near hobby maid enrich vital input hope own dutch must carry dawn forward used olive provide cattle quote romance concert roast proof ability high"
const  INSURANCE_ADDRESS = "X7FNIFYVGJ473AKULOVP6JGAYWIM3GXGPAOLJV6BPPWRQXE3FP6VPVYXJ4"


async function paymentTransaction(message, senderAccount, receiverAddress, amt) {

  try {
            let myAccount = algosdk.mnemonicToSecretKey(senderAccount)
            // Connect your client
            const algodToken = {'X-API-Key':  'fetqTyZ8r82MSX9YT2pLq53iRMZwVibQx3TtrZ2h'};
            const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
            const algodPort = "";
            let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

              // Construct the transaction
              let params = await algodClient.getTransactionParams().do();
              // comment out the next two lines to use suggested fee
              params.fee = algosdk.ALGORAND_MIN_TX_FEE;
              params.flatFee = true;
      
              const receiver = receiverAddress;
              const enc = new TextEncoder();
              const note = enc.encode(message);
              let amount = amt; // equals 1 ALGO
              let sender = myAccount.addr;
      
              let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                  from: sender, 
                  to: receiver, 
                  amount: amount, 
                  note: note, 
                  suggestedParams: params
              });

                      // Sign the transaction
              let signedTxn = txn.signTxn(myAccount.sk);
              let txId = txn.txID().toString();
              console.log("Signed transaction with txID: %s", txId);

                      // Submit the transaction
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        // let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
        // console.log("Transaction information: %o", mytxinfo);
        let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        console.log("Note field: ", string);
        const accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);        
        console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
        console.log("Account balance: %d microAlgos", accountInfo.amount);

  }catch(err){
    console.log(err)
  }

}

const  main = async () => {
  // const patient = await  paymentTransaction(
  //   message = "I want to checkup session with you", 
  //   senderAccount = PATIENT_MNEMONIC, 
  //   receiverAddress = DOCTOR_ADDRESS, 
  //   amt = 1000000
  // )

  // const doctor = await  paymentTransaction(
  //   message = "These are the drug prescriptions, panadol", 
  //   senderAccount = DOCTOR_MNEMONIC, 
  //   receiverAddress = PHARMACIST_ADDRESS, 
  //   amt = 1000000
  // )

  // const pharmacist = await  paymentTransaction(
  //   message = "Precribed drug for John cost 2 Algo", 
  //   senderAccount = PHARMACIST_MNEMONIC, 
  //   receiverAddress = INSURANCE_ADDRESS, 
  //   amt = 1000000
  // )

//   const insuranceCompany = await  paymentTransaction(
//     message = "2 Algo sent for John's drugs", 
//     senderAccount = INSURANCE_MNEMONIC, 
//     receiverAddress = PHARMACIST_ADDRESS, 
//     amt = 2000000
//   )

// const myaccount = algosdk.generateAccount();
// console.log("Account Address = " + myaccount.addr);
// console.log("Account Address = " + algosdk.secretKeyToMnemonic(myaccount.sk));

}

main()