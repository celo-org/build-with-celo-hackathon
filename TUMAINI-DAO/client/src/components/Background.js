
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState, useEffect } from "react";
import joinCommunityjsonabi from "../components/contractjsonfiles/joinCommunity.json";
import Web3 from "web3";

let kit;
let contract;
const Background = () => {
  const JointContractAddress = "0x75769b9E326D5E40650c9C1446d0920789f4e5Fe"//"0xe58f4213486fe3bA22F8d7D45ADF85C2107CAe1d";
  const connectWallet  =  async function (){
   
    if (window.celo) {
      
      try {
        await window.celo.enable()
       
  
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);
  
        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        // setAccounts(accounts[0]);
       contract = new kit.web3.eth.Contract(joinCommunityjsonabi,JointContractAddress);
  
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
  const joincommunity =async ()=>{
    try{
      await contract.methods.joinCommunityy().send({from: kit.defaultAccount});
      alert("joined");
    }catch(error){
      alert(error);
    }
   
  }
  useEffect(()=>{
    connectWallet();
  },[]);

  return (
    <div className="flex justify-around items-end ">
      <div className="absolute top-[300px] text-center flex flex-col justify-around h-[300px]">
        <h1 className="text-7xl text-white">Hope for all</h1>
        <h3 className="text-white">We believe in empowering africa's daughters for tommorrow</h3>
        <div>
          <button className="py-3 px-8 text-white bg-black rounded-full mx-5">See the Impact</button>
          <button onClick={()=>{joincommunity()}} className="py-3 px-8 text-black bg-white rounded-full mx-5">Join Us</button>
        </div>
      </div>
    </div>
  );
};

export default Background;
