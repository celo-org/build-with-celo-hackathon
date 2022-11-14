require('dotenv').config({path: '../.env'})
const algosdk = require('algosdk');
const { APPID } = require("../constants")

async function readLocalState() {

  //   try {
  //     const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
  //     const base_server = process.env.REACT_APP_ALGOD_SERVER
  //     const port = process.env.REACT_APP_PORT
  //     const algodClient = new algosdk.Algodv2(token, base_server, port);
      
  //     let accountInfoResponse = await algodClient.accountInformation(process.env.REACT_APP_PATIENT_ADDRESS).do();
  //     console.log(accountInfoResponse)
  //     let localState = accountInfoResponse['apps-local-state']
  //     return localState.map((item)=> {
  //       if(item['id'] === APPID){
  //         console.log("User's local state:" + item.id);
  //         let localStateItem = accountInfoResponse['apps-local-state'][item]['key-value']
  //         localStateItem.map((local) =>{
  //           console.log(local)
  //           return local
  //         })
  //       }
  //       return item
  //     })
  // }catch(err){
  //   console.log(err)
  // }

    try {
      const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
      const base_server = process.env.REACT_APP_ALGOD_SERVER
      const port = process.env.REACT_APP_PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port);
      
      let accountInfoResponse = await algodClient.accountInformation(process.env.REACT_APP_PATIENT_ADDRESS).do();
      // console.log(accountInfoResponse)
      let localState = accountInfoResponse['apps-local-state']
  
      return localState.map((item)=> {
        if(item.hasOwnProperty('id') && item['id'] === APPID){
          let localStateItem = [item]['id']
          console.log(item.schema)
          // localStateItem.map((local) =>{
          //   console.log(local)
          //   return local
          // })
        }
        return item
      })
  }catch(err){
    console.log(err)
  }

};

readLocalState();