import Contribute from "../components/Contribute";
import Navbar from "../components/Navbar";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState, useEffect } from "react";
import joinCommunityjsonabi from "../components/contractjsonfiles/joinCommunity.json";
import Web3 from "web3";
import { BigNumber} from 'ethers';
import { parseUnits } from "@ethersproject/units";
import {ethers} from "ethers"
import erc20 from "../components/contractjsonfiles/erc20.json";
const ERC20_DECIMALS = 18
let kit;
let contract;
const Community = () => {
    const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    const JointContractAddress = "0x1Fa1910059baC5CB065F71fAE4C383E1488dd4f2"//"0x75769b9E326D5E40650c9C1446d0920789f4e5Fe"
    const [userbalance,setUserBalance] = useState(null);
    const [cusdbalance,setCusdBalance] = useState(0);
    const connectWallet  =  async function (){
   
        if (window.celo) {
          
          try {
            await window.celo.enable()
           
      
            const web3 = new Web3(window.celo);
            kit = newKitFromWeb3(web3);
      
            const accounts = await kit.web3.eth.getAccounts();
            kit.defaultAccount = accounts[0];
            const usercUSD = await kit.web3.eth.getBalance(kit.defaultAccount);
            setCusdBalance(usercUSD);
            // setAccounts(accounts[0]);
           contract = new kit.web3.eth.Contract(joinCommunityjsonabi,JointContractAddress);
        await checkUserRehemaBalance();
          } catch (error) {
            notification(`⚠️ ${error}.`)
          }
        } else {
          notification("⚠️ Please install the CeloExtensionWallet.")
        }
      }
      const notification =(text) =>{
        alert(text)
      }
      //todo call user balance
  const checkUserRehemaBalance = async ()=>{
    try{

     const bal =  await contract.methods.getBalanceofMember().call({from: kit.defaultAccount});
     setUserBalance(bal);


    }catch(error){
      notification(error);
    }
  }
  //buy rehematokens
  const buyRehemaTokens = async()=>{
   
  
    try{
      const rehemacusd = await contract.methods.getRehamaToCusd().call({from :kit.defaultAccount});
         const cusdContract = new  kit.web3.eth.Contract(erc20,cUSDContract);
         await cusdContract.methods.approve(JointContractAddress,rehemacusd).send({from : kit.defaultAccount});
       await contract.methods.buyRehemaTokensForcUSD( ).send({from: kit.defaultAccount});

    }catch(error){
        console.log("please fix",error);
    }
  }
  //share rehema tokens
  const shareRehemaToken= async(address,amount) =>{
    try{
      await contract.methods.shareRehemaTokens(address,amount).send({from: kit.defaultAccount});

    }catch(error){
      console.log("share error",error);
    }
  }
  useEffect( ()=>{
   connectWallet();
    
 },[]);
 
    return ( 
        <div className="bg-indigo-50">
            <Navbar />
            <div  className="mt-[100px]">
            <Contribute balance={userbalance}  cUSD={cusdbalance} buyrehema={buyRehemaTokens} shareRehemaToken={shareRehemaToken}/>
            </div>
        </div>
     );
}
 
export default Community;