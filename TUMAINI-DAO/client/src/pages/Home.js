import Background from "../components/Background";
import Navbar from "../components/Navbar";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState } from "react";
import Web3 from "web3";
import Minting from "../components/Minting";
let kit;
let contract;

const Home = () => {
  const [useraccount,setUserAccount] = useState(null);


  const connectWallet  =  async function (){
   
      if (window.celo) {
        
        try {
          await window.celo.enable()
         
    
          const web3 = new Web3(window.celo);
          kit = newKitFromWeb3(web3);
    
          const accounts = await kit.web3.eth.getAccounts();
          kit.defaultAccount = accounts[0];
          setUserAccount(accounts[0]);
         // contract = new kit.web3.eth.Contract(Abi,contractAddress);
    
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
    
  
  return (
    <div id="background" className="bg-gray-50">
      <img
        src={process.env.PUBLIC_URL + "/landing-image.jpg"}
        alt=""
        className="relative top-0 z-0 brightness-50 h-screen xl:h-[800px] object-cover w-screen "
      />
      <Navbar alama={connectWallet} user={useraccount}/>
      <Background />
      <Minting />
    </div>
  );
};

export default Home;
